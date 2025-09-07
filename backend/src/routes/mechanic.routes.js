const express = require("express");
const router = express.Router();
const mechanicController = require("../controllers/mechanicChecklist.controller");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

router.get("/assigned", protect, mechanicController.getAssignedServices);
router.get("/my-reports", protect, mechanicController.getMyReports);
router.patch("/claim/:id", protect, authorizeRoles("Mechanic"), mechanicController.claimJob);
router.post("/submit-checklist", protect, authorizeRoles("Mechanic"), mechanicController.submitChecklist);

module.exports = router;
