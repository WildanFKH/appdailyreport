const ServiceReport = require("../models/serviceReport.model");
const FinalQc = require("../models/finalQc.model");
const { logAction } = require("../middlewares/audit.middleware");

// Tambah Laporan Service
exports.createServiceReport = async (req, res) => {
  try {
    const newReport = await ServiceReport.create({
      ...req.body,
      created_by: req.user.username,
    });

    // Log Audit Trail
    await logAction(
      req.user.id,
      "CREATE SERVICE REPORT",
      "ServiceReport",
      newReport._id
    );

    res
      .status(201)
      .json({ message: "Laporan service berhasil dibuat", report: newReport });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ambil Semua Laporan Service
exports.getAllServiceReports = async (req, res) => {
  try {
    const reports = await ServiceReport.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ambil Detail Laporan Service berdasarkan ID
exports.getServiceReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceReport = await ServiceReport.findById(id);

    if (!serviceReport) {
      return res
        .status(404)
        .json({ message: "Service Report tidak ditemukan!" });
    }

    res.json(serviceReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Laporan Service
exports.updateServiceReport = async (req, res) => {
  try {
    const report = await ServiceReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Laporan tidak ditemukan" });
    }

    // 🔒 Cek apakah status masih boleh diedit
    if (report.status !== "Pending QC") {
      return res.status(403).json({
        message:
          "Laporan tidak dapat diubah karena status sudah bukan Pending QC",
      });
    }

    Object.assign(report, req.body);
    await report.save();

    // Log Audit Trail (jika lo pakai)
    await logAction(
      req.user.id,
      "UPDATE SERVICE REPORT",
      "ServiceReport",
      report._id
    );

    res.status(200).json({ message: "Laporan berhasil diperbarui", report });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "Pending QC",
      "Assign Mechanic",
      "Rejected QC",
      "Repaired",
      "Ready for Check",
      "Completed",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Status tidak valid!" });
    }

    const updatedReport = await ServiceReport.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedReport) {
      return res
        .status(404)
        .json({ message: "Service Report tidak ditemukan!" });
    }

    res.json(updatedReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hapus Laporan Service
exports.deleteServiceReport = async (req, res) => {
  try {
    const report = await ServiceReport.findById(req.params.id);
    if (!report)
      return res.status(404).json({ message: "Laporan tidak ditemukan" });

    // 🔒 Cek apakah status masih boleh dihapus
    if (report.status !== "Pending QC") {
      return res.status(403).json({
        message:
          "The report cannot be deleted because the status is no longer Pending QC",
      });
    }

    await report.deleteOne();

    // Log Audit Trail
    await logAction(
      req.user.id,
      "DELETE SERVICE REPORT",
      "ServiceReport",
      req.params.id
    );

    res.status(200).json({ message: "Laporan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ambil Laporan Service yang sudah selesai
exports.getCompletedReports = async (req, res) => {
  try {
    const reports = await ServiceReport.find({ status: "Completed" })
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

// Ambil Laporan Service yang sudah selesai hari ini
exports.getCompletedReportsToday = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0); // 00:00:00

    const end = new Date();
    end.setHours(23, 59, 59, 999); // 23:59:59

    const reports = await ServiceReport.find({
      status: "Completed",
      updatedAt: { $gte: start, $lte: end },
    })
      .populate("assignedTo", "username")
      .populate({
        path: "finalQc",
        populate: [
          { path: "checkedBy", select: "username" },
          {
            path: "usedSpareparts.sparepart",
            select: "name brand size colour",
          },
        ],
      });

    res.status(200).json(reports);
  } catch (err) {
    console.error("ERROR getCompletedReportsToday:", err);
    res.status(500).json({ message: err.message });
  }
};

// Ambil Laporan Service yang sudah selesai dalam seminggu terakhir
exports.getCompletedReportsWeek = async (req, res) => {
  try {
    const end = new Date(); // Current date and time
    end.setHours(23, 59, 59, 999); // Set to end of day

    const start = new Date();
    start.setDate(start.getDate() - 7); // Go back 7 days
    start.setHours(0, 0, 0, 0); // Set to start of day

    const reports = await ServiceReport.find({
      status: "Completed",
      updatedAt: { $gte: start, $lte: end },
    })
      .populate("assignedTo", "username")
      .populate({
        path: "finalQc",
        populate: [
          { path: "checkedBy", select: "username" },
          {
            path: "usedSpareparts.sparepart",
            select: "name brand size colour",
          },
        ],
      });

    res.status(200).json(reports);
  } catch (err) {
    console.error("ERROR getCompletedReportsWeek:", err);
    res.status(500).json({ message: err.message });
  }
};

// Ambil Laporan Service yang sudah selesai dalam sebulan terakhir
exports.getCompletedReportsMonth = async (req, res) => {
  try {
    const end = new Date(); // Current date and time
    end.setHours(23, 59, 59, 999); // Set to end of day

    const start = new Date();
    start.setMonth(start.getMonth() - 1); // Go back 1 month
    start.setHours(0, 0, 0, 0); // Set to start of day

    const reports = await ServiceReport.find({
      status: "Completed",
      updatedAt: { $gte: start, $lte: end },
    })
      .populate("assignedTo", "username")
      .populate({
        path: "finalQc",
        populate: [
          { path: "checkedBy", select: "username" },
          {
            path: "usedSpareparts.sparepart",
            select: "name brand size colour",
          },
        ],
      });

    res.status(200).json(reports);
  } catch (err) {
    console.error("ERROR getCompletedReportsMonth:", err);
    res.status(500).json({ message: err.message });
  }
};

// Ambil Data Chart Laporan Service
exports.getServiceReportChart = async (req, res) => {
  try {
    const monthlyCounts = await ServiceReport.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);

    // Siapkan array bulan dan data
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const chartData = Array(12).fill(0);

    monthlyCounts.forEach((item) => {
      chartData[item._id - 1] = item.count;
    });

    res.status(200).json({
      labels: monthNames,
      data: chartData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
