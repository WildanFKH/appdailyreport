const express = require("express");
const router = express.Router();
const controller = require("../controllers/dailyReport.controller");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

router.get("/", protect, authorizeRoles("Admin"), controller.getDailyReport);

module.exports = router;
