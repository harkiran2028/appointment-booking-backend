const Appointment = require("../models/Appointment");
const { sendEmail } = require("../services/emailService");

// Create Appointment
exports.createAppointment = async (req, res) => {
  try {
    const { name, date, time, reason, phone, email, address } = req.body;

    const existingAppointment = await Appointment.findOne({ date, time });

    if (existingAppointment) {
      return res
        .status(400)
        .json({ message: "This time slot is already booked." });
    }

    const meetLink = `https://meet.jit.si/Appoint-${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}`;

    const newAppointment = new Appointment({
      name,
      date,
      time,
      reason,
      phone,
      email,
      address,
      meetLink,
    });
    await newAppointment.save();

    await sendEmail(name, email, date, time, meetLink);

    res.status(201).json({ message: "Appointment booked!", meetLink });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get Appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.params;

    const allSlots = [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
    ];

    const bookedAppointments = await Appointment.find({ date });
    const bookedSlots = bookedAppointments.map((appt) => appt.time);

    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    res.json({ availableSlots });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
