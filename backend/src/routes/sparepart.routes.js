const express = require("express");
const router = express.Router();
const sparepartController = require("../controllers/sparepart.controller");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

router.get("/", sparepartController.getSpareparts);
router.get("/:id", sparepartController.getSparepartById);
router.post("/", protect, authorizeRoles("Inventory"), sparepartController.createSparepart);
router.put("/:id", protect, authorizeRoles("Inventory"), sparepartController.updateSparepart);
router.delete("/:id", protect, authorizeRoles("Inventory"), sparepartController.deleteSparepart);

module.exports = router;
