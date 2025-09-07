const express = require("express");
const Audit = require("../models/audit.model");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

const router = express.Router();

// Get All Audit Logs (Hanya Admin Audit)
router.get("/", protect, authorizeRoles("Admin"), async (req, res) => {
  try {
    const logs = await Audit.find().populate("user", "username email role").sort({ timestamp: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;