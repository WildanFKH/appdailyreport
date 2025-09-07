const User = require("../models/user.model");
const Audit = require("../models/audit.model");
const ServiceReport = require("../models/serviceReport.model");
const Sparepart = require("../models/sparepart.model");
const { logAction } = require("../middlewares/audit.middleware");

// Tambah User Baru (Hanya Admin Audit)
exports.addUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !role) {
    return res.status(400).json({ message: "Semua field harus diisi" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email sudah digunakan" });

    const newUser = await User.create({ username, email, password: "password123", role });

    // Catat di Audit Trail
    await logAction(req.user.id, "CREATE USER", "User", newUser._id);

    res
      .status(201)
      .json({ message: "User berhasil ditambahkan", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dapatkan Semua User
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ambil Audit Log
exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await Audit.find()
      .sort({ timestamp: -1 })
      .limit(100)
      .populate("user", "username role");
    
    const formatted = logs.map(log => ({
      _id: log._id,
      timestamp: log.timestamp,
      action: log.action,
      targetId: log.targetId,
      username: log.user?.username || "Unknown",
      role: log.user?.role,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dapatkan Semua Service yang sudah disetujui
exports.getApprovedService = async (req, res) => {
  try {
      const reports = await ServiceReport.find({ status: "Audit Approved" })
        .populate("assignedTo", "username")
        .populate({
          path: "finalQc",
          populate: [
            { path: "checkedBy", select: "username role" },
            {
              path: "usedSpareparts.sparepart",
              select: "name brand size colour",
            },
          ],
        });
      res.status(200).json(reports);
    } catch (error) {
      console.error("ERROR GET COMPLETED REPORT:", error);
      res.status(500).json({ message: error.message });
    }
};

// Update User (Hanya Admin Audit)
exports.updateUser = async (req, res) => {
  try {
    const { username, email, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    // Catat di Audit Trail
    await logAction(req.user.id, "UPDATE USER", "User", user._id);

    res.status(200).json({ message: "User berhasil diperbarui", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hapus User (Hanya Admin Audit)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    await user.deleteOne();

    // Catat di Audit Trail
    await logAction(req.user.id, "DELETE USER", "User", req.params.id);

    res.status(200).json({ message: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve Service Complete
exports.submitAuditApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved, notes } = req.body;

    const service = await ServiceReport.findById(id).populate("finalQc");
    if (!service || service.status !== "Audit Approved") {
      return res.status(400).json({ message: "Service tidak valid untuk proses audit" });
    }

    // Jika disetujui
    if (isApproved) {
      const finalQc = service.finalQc;
      if (!finalQc || !finalQc.usedSpareparts) {
        return res.status(400).json({ message: "Final QC tidak lengkap" });
      }

      for (let item of finalQc.usedSpareparts) {
        const spare = await Sparepart.findById(item.sparepart);
        if (!spare) {
          return res.status(404).json({
            message: `Sparepart dengan ID ${item.sparepart} tidak ditemukan`,
          });
        }

        if (spare.quantity < item.quantity) {
          return res.status(400).json({
            message: `Stok tidak cukup untuk ${spare.name}. Tersedia: ${spare.quantity}, Dibutuhkan: ${item.quantity}`,
          });
        }

        spare.quantity -= item.quantity;
        await spare.save();
      }

      service.status = "Completed";
      await service.save();

      await logAction(req.user.id, "APPROVE SERVICE REPORT", "ServiceReport", service._id);

      return res.status(200).json({ message: "Service berhasil disetujui dan stok diperbarui", service });

    } else {
      // Jika ditolak
      service.status = "Rejected";
      service.auditNote = notes || "Service ditolak oleh Audit";
      await service.save();

      await logAction(req.user.id, "REJECT SERVICE REPORT", "ServiceReport", service._id);

      return res.status(200).json({ message: "Service berhasil ditolak", service });
    }

  } catch (error) {
    console.error("AUDIT_DECISION_ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};


