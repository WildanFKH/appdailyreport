const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "dailyreport",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected to dailyreport...");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
