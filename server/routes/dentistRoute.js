import express from 'express';

import Dentist from '../models/dentistModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import Appointment from '../models/appointmentModel.js';
import User from '../models/userModel.js';

const router = express.Router();

router.post(
  '/get-dentist-info-by-user-id',
  authMiddleware,
  async (req, res) => {
    try {
      const dentist = await Dentist.findOne({ userId: req.body.userId });
      res.status(200).send({
        success: true,
        message: 'Dentist info fetched successfully',
        dentist,
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Error getting dentist info', success: false, error });
    }
  }
);

router.post('/get-dentist-info-by-id', authMiddleware, async (req, res) => {
  try {
    const dentist = await Dentist.findOne({ _id: req.body.dentistId });
    res.status(200).send({
      success: true,
      message: 'Dentist info fetched successfully',
      dentist,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error getting dentist info', success: false, error });
  }
});

router.post('/update-dentist-profile', authMiddleware, async (req, res) => {
  try {
    const dentist = await Dentist.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: 'Dentist profile updated successfully',
      dentist,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error getting dentist info', success: false, error });
  }
});

router.get(
  '/get-appointments-by-dentist-id',
  authMiddleware,
  async (req, res) => {
    try {
      const dentist = await Dentist.findOne({ userId: req.body.userId });
      const appointments = await Appointment.find({ dentistId: dentist._id });
      res.status(200).send({
        message: 'Appointments fetched successfully',
        success: true,
        appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: 'Error fetching appointments',
        success: false,
        error,
      });
    }
  }
);

router.post('/change-appointment-status', authMiddleware, async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    });

    const user = await User.findOne({ _id: appointment.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: 'appointment-status-changed',
      message: `Your appointment status has been ${status}`,
      onClickPath: '/appointments',
    });

    await user.save();

    res.status(200).send({
      message: 'Appointment status updated successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error changing appointment status',
      success: false,
      error,
    });
  }
});

export default router;
