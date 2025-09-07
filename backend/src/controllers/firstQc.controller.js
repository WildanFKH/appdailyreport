const QCChecklist = require("../models/firstQc.model");
const ServiceReport = require("../models/serviceReport.model");
const { logAction } = require("../middlewares/audit.middleware");

// Kirim QC Checklist
exports.submitQCChecklist = async (req, res) => {
  try {
    const { serviceReportId } = req.params;
    const { isApproved, notes } = req.body;

    // Cek Service Report-nya dulu
    const report = await ServiceReport.findById(serviceReportId);
    if (!report) {
      return res.status(404).json({ message: "Service Report tidak ditemukan" });
    }

    if (report.status !== "Pending QC") {
      return res.status(400).json({ message: "Laporan ini bukan dalam status Pending QC" });
    }

    // Buat QC Checklist baru
    const checklist = new QCChecklist({
      serviceReport: serviceReportId,
      checked_by: req.user.id,
      isApproved,
      notes: isApproved ? "" : notes,
    });

    await checklist.save();

    // Ubah status Service Report
    if (isApproved) {
      report.status = "Assign Mechanic";
    } else {
      report.status = "Rejected";
    }

    await report.save();

    // Log
    await logAction(req.user.id, "FIRST QC SUBMIT", "QCChecklist", checklist._id);

    res.status(201).json({
      message: `Checklist QC berhasil disubmit dan status laporan diubah ke "${report.status}"`,
      checklist
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dapatkan semua QC Checklist
exports.getPendingQCList = async (req, res) => {
  try {
    const reports = await ServiceReport.find({ status: "Pending QC" });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

