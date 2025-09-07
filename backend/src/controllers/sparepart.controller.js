const Sparepart = require("../models/sparepart.model");
const { logAction } = require("../middlewares/audit.middleware");

// But Sparepart
exports.createSparepart = async (req, res) => {
  try {
    const sparepart = await Sparepart.create(req.body);

    // Log create action
    await logAction(
      req.user.id,
      "CREATE SPAREPART",
      "Sparepart",
      sparepart._id
    );

    res
      .status(201)
      .json({ message: "Sparepart berhasil ditambahkan", sparepart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dapatkan semua Sparepart
exports.getSpareparts = async (req, res) => {
  try {
    const spareparts = await Sparepart.find();
    res.json(spareparts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dapatkan Sparepart berdasarkan ID
exports.getSparepartById = async (req, res) => {
  try {
    const sparepart = await Sparepart.findById(req.params.id);
    if (!sparepart) {
      return res.status(404).json({ message: "Sparepart tidak ditemukan" });
    }
    res.json(sparepart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Sparepart
exports.updateSparepart = async (req, res) => {
  try {
    const updated = await Sparepart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Sparepart tidak ditemukan" });
    }

    // Log update action
    await logAction(req.user.id, "UPDATE SPAREPART", "Sparepart", updated._id);

    res.json({ message: "Sparepart berhasil diupdate", sparepart: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Sparepart
exports.deleteSparepart = async (req, res) => {
  try {
    const deleted = await Sparepart.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Sparepart tidak ditemukan" });
    }

    // Log delete action
    await logAction(req.user.id, "DELETE SPAREPART", "Sparepart", deleted._id);

    res.json({ message: "Sparepart berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
