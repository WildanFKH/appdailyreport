const express = require("express");
const router = express.Router();
const controller = require("../controllers/sparepartRequest.controller");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

// Inventory
router.post("/", protect, authorizeRoles("Inventory"), controller.createRequest);

// Admin Audit
router.get("/", protect, controller.getAllRequests);
router.patch("/:id/approve", protect, authorizeRoles("Admin"), controller.approveRequest);
router.patch("/:id/reject", protect, authorizeRoles("Admin"), controller.rejectRequest);

module.exports = router;
