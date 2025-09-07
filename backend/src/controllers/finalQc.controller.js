const FinalQc = require("../models/finalQc.model");
const ServiceReport = require("../models/serviceReport.model");
const Sparepart = require("../models/sparepart.model");
const MechanicChecklist = require("../models/mechanicChecklist.model");
const { logAction } = require("../middlewares/audit.middleware");

exports.getReadyForFinalQc = async (req, res) => {
  try {
    const reports = await ServiceReport.find({ status: "Ready for Check" })
      .populate("assignedTo", "username")
      .populate({path: "finalQc"});
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dapatkan laporan Final QC berdasarkan ID laporan
exports.getFinalQcByReportId = async (req, res) => {
  try {
    const { id } = req.params;

    const finalQc = await FinalQc.findOne({ serviceReport: id })
      .populate("checkedBy", "username role")
      .populate("usedSpareparts.sparepart", "name brand size colour");

    if (!finalQc) {
      return res.status(404).json({
        message: "Riwayat Final QC tidak ditemukan untuk laporan ini",
      });
    }

    res.status(200).json(finalQc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kirim laporan Final QC
exports.submitFinalQc = async (req, res) => {
  try {
    const { id } = req.params;
    const { serviceFee, notes } = req.body;

    const service = await ServiceReport.findById(id);
    if (!service || service.status !== "Ready for Check") {
      return res.status(400).json({ message: "Service tidak ditemukan atau belum siap Final QC" });
    }

    const mechanicChecklist = await MechanicChecklist.findOne({ serviceReport: id });
    if (!mechanicChecklist || !mechanicChecklist.usedSpareparts) {
      return res.status(404).json({ message: "Checklist dari mekanik belum tersedia" });
    }

    let totalSparepartCost = 0;
    const sparepartDetails = [];

    for (let item of mechanicChecklist.usedSpareparts) {
      const spare = await Sparepart.findById(item.sparepart);
      if (!spare) {
        return res.status(404).json({
          message: `Sparepart dengan ID ${item.sparepart} tidak ditemukan di inventory`,
        });
      }

      totalSparepartCost += spare.priceWT * item.quantity;

      sparepartDetails.push({
        sparepart: spare._id,
        quantity: item.quantity,
        cost: spare.cost,
        priceWT: spare.priceWT,
      });
    }

    const totalEstimate = totalSparepartCost + serviceFee;

    const finalQc = await FinalQc.create({
      serviceReport: id,
      checkedBy: req.user.id,
      notes,
      usedSpareparts: sparepartDetails,
      serviceFee,
      totalEstimate,
    });

    service.finalQc = finalQc._id;
    service.status = "Audit Approved";
    await service.save();

    await logAction(req.user.id, "FINAL QC SUBMIT", "FinalQc", finalQc._id);

    res.status(201).json({
      message: "Final QC berhasil disubmit dan menunggu persetujuan audit",
      finalQc,
    });
  } catch (err) {
    console.error("FINAL_QC_ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
