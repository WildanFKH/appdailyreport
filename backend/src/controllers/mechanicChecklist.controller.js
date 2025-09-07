const MechanicChecklist = require("../models/mechanicChecklist.model");
const ServiceReport = require("../models/serviceReport.model");
const Sparepart = require("../models/sparepart.model");
const { logAction } = require("../middlewares/audit.middleware");

// Ambil daftar service yang harus dikerjakan oleh mekanik
exports.getAssignedServices = async (req, res) => {
  try {
    const reports = await ServiceReport.find({ status: "Assign Mechanic" });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ambil daftar service yang sudah diambil oleh mekanik
exports.getMyReports = async (req, res) => {
  try {
    const reports = await ServiceReport.find({
      status: "Repaired",
      assignedTo: req.user.id,
    });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mekanik ambil job - ubah status jadi 'Repaired'
exports.claimJob = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await ServiceReport.findById(id);
    if (!report) {
      return res
        .status(404)
        .json({ message: "Service report tidak ditemukan" });
    }

    if (report.status !== "Assign Mechanic") {
      return res
        .status(400)
        .json({ message: "Service ini tidak tersedia untuk diambil" });
    }

    report.status = "Repaired";
    report.assignedTo = req.user.id;
    await report.save();

    // Log
    await logAction(
      req.user.id,
      "MECHANIC CLAIM JOB",
      "ServiceReport",
      report._id
    );

    res.status(200).json({ message: "Job berhasil diambil", report });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mekanik submit checklist - ubah status jadi 'Ready for Check'
exports.submitChecklist = async (req, res) => {
  try {
    const { serviceReportId, notes, usedSpareparts } = req.body;

    const report = await ServiceReport.findById(serviceReportId);
    if (!report || report.status !== "Repaired") {
      return res
        .status(400)
        .json({
          message: "Service tidak valid atau belum dalam status 'Repaired'",
        });
    }

    const updatedSpareparts = await Promise.all(
      usedSpareparts.map(async (item) => {
        const spare = await Sparepart.findById(item.sparepart);
        if (!spare)
          throw new Error(
            `Sparepart dengan ID ${item.sparepart} tidak ditemukan`
          );
        if (spare.quantity < item.quantity) {
          throw new Error(
            `Stok tidak cukup untuk ${spare.name}. Tersedia: ${spare.quantity}, Dibutuhkan: ${item.quantity}`
          );
        }

        return {
          sparepart: spare._id,
          quantity: item.quantity,
          priceWT: spare.priceWT,
        };
      })
    );

    const checklist = await MechanicChecklist.create({
      serviceReport: serviceReportId,
      mechanic: req.user.id,
      notes,
      usedSpareparts: updatedSpareparts,
    });

    report.status = "Ready for Check";
    await report.save();

    await logAction(
      req.user.id,
      "MECHANIC SUBMIT JOB",
      "MechanicChecklist",
      checklist._id
    );

    res.status(201).json({
      message: `Checklist mekanik berhasil disimpan dan status laporan diubah menjadi "Ready for Check"`,
      checklist,
    });
  } catch (error) {
    console.error("Error Checklist Mekanik:", error.message);
    res.status(500).json({ message: error.message });
  }
};
