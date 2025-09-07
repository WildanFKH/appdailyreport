const SparepartRequest = require("../models/sparepartRequest.model");
const Sparepart = require("../models/sparepart.model");
const { logAction } = require("../middlewares/audit.middleware");

// Buat permintaan sparepart 
exports.createRequest = async (req, res) => {
  try {
    const { sparepart, quantity, note } = req.body;

    const request = await SparepartRequest.create({
      sparepart,
      requestedBy: req.user.id,
      quantity,
      note,
    });

    await logAction(
      req.user.id,
      "REQUEST SPAREPART",
      "SparepartRequest",
      request._id
    );

    res
      .status(201)
      .json({ message: "Permintaan sparepart berhasil dibuat", request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ambil semua request 
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await SparepartRequest.find()
      .populate("sparepart")
      .populate("requestedBy", "username")
      .populate("reviewedBy", "username")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve 
exports.approveRequest = async (req, res) => {
  try {
    const request = await SparepartRequest.findById(req.params.id);
    if (!request || request.status !== "Pending") {
      return res
        .status(404)
        .json({ message: "Permintaan tidak ditemukan atau sudah diproses" });
    }

    const sparepart = await Sparepart.findById(request.sparepart);
    if (!sparepart) {
      return res.status(404).json({ message: "Sparepart tidak ditemukan" });
    }

    // Tambahkan stok
    sparepart.quantity += request.quantity;
    await sparepart.save();

    // Update request
    request.status = "Approved";
    request.reviewedBy = req.user.id;
    request.reviewedAt = new Date();
    await request.save();

    await logAction(
      req.user.id,
      "APPROVE SPAREPART REQUEST",
      "SparepartRequest",
      request._id
    );

    res.json({ message: "Permintaan disetujui dan stok diperbarui", request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject 
exports.rejectRequest = async (req, res) => {
  try {
    const request = await SparepartRequest.findById(req.params.id);
    if (!request || request.status !== "Pending") {
      return res
        .status(404)
        .json({ message: "Permintaan tidak ditemukan atau sudah diproses" });
    }

    request.status = "Rejected";
    request.reviewedBy = req.user.id;
    request.reviewedAt = new Date();
    await request.save();

    await logAction(
      req.user.id,
      "REJECT SPAREPART REQUEST",
      "SparepartRequest",
      request._id
    );

    res.json({ message: "Permintaan ditolak", request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
