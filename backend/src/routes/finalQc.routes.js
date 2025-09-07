const express = require("express");
const router = express.Router();
const finalQcController = require("../controllers/finalQc.controller");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

router.get("/ready", protect, finalQcController.getReadyForFinalQc);
router.get("/report/:id", protect, finalQcController.getFinalQcByReportId);
router.post("/approve/:id", protect, authorizeRoles("QC"), finalQcController.submitFinalQc);

module.exports = router;
