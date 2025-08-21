require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const appointmentRoutes = require("./routes/appointmentRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
