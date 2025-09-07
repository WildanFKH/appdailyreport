const User = require("../models/user.model");
const Sparepart = require("../models/sparepart.model");
const ServiceReport = require("../models/serviceReport.model");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// Login User dengan Email, Password, dan Role
exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.findOne({ email });

    // Cek apakah user ada dan password sesuai
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Cek apakah role yang dimasukkan sesuai dengan user
    if (user.role !== role) {
      return res.status(401).json({ message: "Role tidak sesuai" });
    }

    res.json({ token: generateToken(user), user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan data user berdasarkan token
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    console.error("Error getProfile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fungsi untuk mengubah password
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

  const isMatch = await user.matchPassword(oldPassword);
  if (!isMatch) return res.status(400).json({ message: "Password lama salah" });

  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: "Password berhasil diubah" });
};

// Fungsi untuk mendapatkan data dashboard
exports.getDashboardSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSpareparts = await Sparepart.countDocuments();
    const totalServiceReports = await ServiceReport.countDocuments();
    const completed = await ServiceReport.countDocuments({
      status: "Completed",
    });

    res.json({
      totalUsers,
      totalSpareparts,
      totalServiceReports,
      serviceReportStats: {
        completed,
      },
    });
  } catch (err) {
    console.error("Gagal ambil dashboard summary:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
