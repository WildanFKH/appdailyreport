const mongoose = require("mongoose");

const AuditSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  created_by: { type: String, required: true }, // Nama user yang melakukan aksi
  action: { type: String, required: true }, // CREATE, UPDATE, DELETE, dll.
  target: { type: String, required: true }, // User, ServiceReport, Sparepart, dll.
  targetId: { type: mongoose.Schema.Types.ObjectId }, // ID dari data yang dimodifikasi
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Audit", AuditSchema);
