const express = require("express");
const router = express.Router();
const { login, getDashboardSummary, getProfile, changePassword } = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

router.post("/login", login);
router.put("/change-password", protect, changePassword);
router.get("/me", protect, getProfile);
router.get("/dashboard/summary", protect, getDashboardSummary);

module.exports = router;
