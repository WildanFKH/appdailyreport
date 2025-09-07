require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();
connectDB(); 

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true, 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const auditRoutes = require("./routes/audit.routes");
const serviceReportRoutes = require("./routes/serviceReport.routes");
const firstQcRoutes = require("./routes/firstQc.routes");
const mechanicRoutes = require("./routes/mechanic.routes");
const finalQcRoutes = require("./routes/finalQc.routes");
const sparepartRoutes = require("./routes/sparepart.routes");
const sparepartRequestRoutes = require("./routes/sparepartRequest.routes");
const dailyReport = require("./routes/dailyReport.routes");

// Gunakan Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/service-report", serviceReportRoutes);
app.use("/api/first-qc", firstQcRoutes);
app.use("/api/mechanic", mechanicRoutes);
app.use("/api/final-qc", finalQcRoutes);
app.use("/api/sparepart", sparepartRoutes);
app.use("/api/sparepart-requests", sparepartRequestRoutes);
app.use("/api/daily-report", dailyReport);


// Routes
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
