const FinalQc = require("../models/finalQc.model");

// Dapatkan laporan harian
exports.getDailyReport = async (req, res) => {
  try {
    const { date, fromDate, toDate } = req.query;
    
    let startDate, endDate;
    
    // Jika menggunakan single date
    if (date) {
      startDate = new Date(date);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
    } 
    // Jika menggunakan date range
    else if (fromDate && toDate) {
      startDate = new Date(fromDate);
      endDate = new Date(toDate);
      // Tambahkan 1 hari ke endDate untuk include seluruh hari toDate
      endDate.setDate(endDate.getDate() + 1);
    } 
    // Jika tidak ada parameter yang valid
    else {
      return res.status(400).json({ 
        message: "Please provide either 'date' parameter or both 'fromDate' and 'toDate' parameters" 
      });
    }

    // Validasi tanggal
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ 
        message: "Invalid date format. Please use YYYY-MM-DD format" 
      });
    }

    // Pastikan startDate tidak lebih besar dari endDate
    if (startDate >= endDate) {
      return res.status(400).json({ 
        message: "Start date must be before end date" 
      });
    }

    console.log(`Fetching reports from ${startDate.toISOString()} to ${endDate.toISOString()}`);

    const reports = await FinalQc.find({
      createdAt: { $gte: startDate, $lt: endDate },
    }).populate("usedSpareparts.sparepart", "name brand size colour");

    console.log(`Found ${reports.length} reports`);

    const summary = {
      totalService: reports.length,
      sparepartUsage: {},
      totalSparepartCost: 0,
      totalServiceFee: 0,
      totalEstimate: 0,
    };

    for (const report of reports) {
      summary.totalServiceFee += report.serviceFee || 0;

      // Pastikan usedSpareparts ada dan merupakan array
      if (report.usedSpareparts && Array.isArray(report.usedSpareparts)) {
        for (const item of report.usedSpareparts) {
          // Validasi item dan sparepart
          if (!item.sparepart || !item.sparepart.name) {
            console.warn('Invalid sparepart data found:', item);
            continue;
          }

          const name = item.sparepart.name;
          if (!summary.sparepartUsage[name]) {
            summary.sparepartUsage[name] = {
              quantity: 0,
              totalCost: 0,
              unitPrice: item.priceWT || 0,
              brand: item.sparepart.brand || '',
              size: item.sparepart.size || '',
              colour: item.sparepart.colour || ''
            };
          }

          const cost = (item.priceWT || 0) * (item.quantity || 0);
          summary.sparepartUsage[name].quantity += item.quantity || 0;
          summary.sparepartUsage[name].totalCost += cost;
          summary.totalSparepartCost += cost;
        }
      }
    }

    summary.totalEstimate = summary.totalSparepartCost + summary.totalServiceFee;

    res.json(summary);
  } catch (err) {
    console.error("Error in getDailyReport:", err);
    res.status(500).json({ message: err.message });
  }
};