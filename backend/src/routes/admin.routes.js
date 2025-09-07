const express = require("express");
const { addUser, getAllUsers, deleteUser, updateUser, getAuditLogs, submitAuditApproval, getApprovedService } = require("../controllers/admin.controller");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/users", protect, getAllUsers);
router.get("/approved-service", protect, getApprovedService);
router.get("/audit-trail", protect, authorizeRoles("Admin"), getAuditLogs);
router.post("/users", protect, authorizeRoles("Admin"), addUser);
router.put("/users/:id", protect, authorizeRoles("Admin"), updateUser); 
router.delete("/users/:id", protect, authorizeRoles("Admin") ,deleteUser);
router.post("/approve-service/:id", protect, authorizeRoles("Admin"), submitAuditApproval);

module.exports = router;
