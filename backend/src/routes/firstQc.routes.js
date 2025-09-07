const express = require("express");
const router = express.Router();
const qcChecklistController = require("../controllers/firstQc.controller");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

router.get( "/pending", protect, qcChecklistController.getPendingQCList );
router.post( "/:serviceReportId", protect, authorizeRoles("QC"), qcChecklistController.submitQCChecklist );

module.exports = router;
