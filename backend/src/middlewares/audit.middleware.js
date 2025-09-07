const Audit = require("../models/audit.model");
const User = require("../models/user.model");

// Log Function
exports.logAction = async (userId, action, target, targetId = null) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    await Audit.create({
      user: userId,
      created_by: user.username,
      action,
      target,
      targetId,
    });
  } catch (error) {
    console.error("❌ Gagal mencatat audit trail:", error);
  }
};
