const express = require("express");
const router = express.Router();
const serviceReport = require("../controllers/serviceReport.controller");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

// SA only
router.post("/", protect, authorizeRoles("SA"), serviceReport.createServiceReport);
router.put("/:id", protect, authorizeRoles("SA"), serviceReport.updateServiceReport);
router.delete("/:id", protect, authorizeRoles("SA"), serviceReport.deleteServiceReport);

// All users
router.get("/", protect, serviceReport.getAllServiceReports);
router.get("/chart", protect, serviceReport.getServiceReportChart);
router.get("/complete", protect, serviceReport.getCompletedReports);
router.get("/complete/today", protect, serviceReport.getCompletedReportsToday);
router.get("/complete/week", protect, serviceReport.getCompletedReportsWeek);
router.get("/complete/month", protect, serviceReport.getCompletedReportsMonth);
router.get("/:id", protect, serviceReport.getServiceReportById);
router.patch("/:id/status", protect, authorizeRoles("QC", "Mechanic"), serviceReport.updateStatus);

module.exports = router;
