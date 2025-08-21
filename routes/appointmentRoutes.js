const express = require("express");
const {
  createAppointment,
  getAppointments,
  getAvailableSlots,
} = require("../controllers/appointmentController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createAppointment);
router.get("/", verifyToken, getAppointments);
router.get("/available-slots/:date", getAvailableSlots);

module.exports = router;
