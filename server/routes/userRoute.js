import express from 'express';
import bcrypt from 'bcrypt';
import Dentist from '../models/dentistModel.js';
import Appointment from '../models/appointmentModel.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middlewares/authMiddleware.js';
import moment from 'moment';

const router = express.Router();

// USER AUTHENTICATION
router.post('/register', async (req, res) => {
  try {
    const { name, email } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(404).send({
        message: `User with email: ${email}, already exists.`,
        success: false,
      });

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    req.body.password = hashedPassword;

    const newUser = new User(req.body);

    await newUser.save();

    res.status(201).send({
      message: `Account with the name: ${name}, has been created.`,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error creating user', error, success: false });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).send({
        message: `User with email: ${email}, does not exist.`,
        success: false,
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).send({
        message: 'Password is incorrect!',
        success: false,
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const { isAdmin, isDentist } = user;

    res.status(200).send({
      message: 'Login Successful',
      success: true,
      token,
      id: user._id,
      isAdmin,
      isDentist,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error logging in user', error, success: false });
  }
});

router.post('/get-user-info-by-id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });

    if (!user)
      return res.status(404).send({
        message: `User with email: ${user.email}, does not exist.`,
        success: false,
      });

    const {
      id,
      name,
      email,
      isDentist,
      isAdmin,
      seenNotifications,
      unseenNotifications,
    } = user;

    res.status(200).send({
      success: true,
      id,
      name,
      email,
      isDentist,
      isAdmin,
      seenNotifications,
      unseenNotifications,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error getting user info', error, success: false });
  }
});

// DENTIST APPLICATION
router.post('/apply-dentist-account', authMiddleware, async (req, res) => {
  try {
    const newDentist = new Dentist({ ...req.body, status: 'pending' });

    await newDentist.save();

    const adminUser = await User.findOne({ isAdmin: true });
    const unseenNotifications = adminUser.unseenNotifications;

    unseenNotifications.push({
      type: 'new-dentist-request',
      message: `${newDentist.firstName} ${newDentist.lastName} has applied for a dentist account`,
      data: {
        dentistId: newDentist._id,
        name: `${newDentist.firstName} ${newDentist.lastName}`,
      },
      onClickPath: '/admin/dentists-list',
    });

    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({
      success: true,
      message: 'Dentist account applied successfully',
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error applying dentist account',
      error,
      success: false,
    });
  }
});

// ALL NOTIFICATIONS
router.post(
  '/mark-all-notifications-as-seen',
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      const currentUnseenNotifications = user.unseenNotifications;
      const currentSeenNotifications = user.seenNotifications;
      currentSeenNotifications.push(...currentUnseenNotifications);
      user.seenNotifications = currentSeenNotifications;
      user.unseenNotifications = [];
      const updatedUser = await user.save();
      updatedUser.password = undefined;

      const {
        id,
        name,
        email,
        isDentist,
        isAdmin,
        seenNotifications,
        unseenNotifications,
      } = updatedUser;

      res.status(200).send({
        success: true,
        message: 'All notifications marked as seen',
        id,
        name,
        email,
        isDentist,
        isAdmin,
        seenNotifications,
        unseenNotifications,
      });
    } catch (error) {
      res.status(500).send({
        message: 'Error clearing unseen notifications',
        error,
        success: false,
      });
    }
  }
);

router.post('/delete-all-notifications', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;

    const {
      id,
      name,
      email,
      isDentist,
      isAdmin,
      seenNotifications,
      unseenNotifications,
    } = updatedUser;

    res.status(200).send({
      success: true,
      message: 'All unseen notifications cleared',
      id,
      name,
      email,
      isDentist,
      isAdmin,
      seenNotifications,
      unseenNotifications,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error clearing unseen notifications',
      error,
      success: false,
    });
  }
});

router.get('/get-all-approved-dentists', authMiddleware, async (req, res) => {
  try {
    const dentists = await Dentist.find({ status: 'approved' });
    res.status(200).send({
      message: 'Dentists fetched successfully',
      success: true,
      dentists,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error fetching approved dentists',
      success: false,
      error,
    });
  }
});

router.post('/book-appointment', authMiddleware, async (req, res) => {
  try {
    req.body.status = 'pending';
    req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
    req.body.time = moment(req.body.time, 'HH:mm').toISOString();
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    //pushing notification to dentist based on his userid
    const user = await User.findOne({ _id: req.body.dentistInfo.userId });
    user.unseenNotifications.push({
      type: 'new-appointment-request',
      message: `A new appointment request has been made by ${req.body.userInfo.name}`,
      onClickPath: '/dentist/appointments',
    });
    await user.save();
    res.status(200).send({
      message: 'Appointment booked successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error booking appointment',
      success: false,
      error,
    });
  }
});

router.post('/check-booking-availability', authMiddleware, async (req, res) => {
  try {
    const date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
    const fromTime = moment(req.body.time, 'HH:mm')
      .subtract(1, 'hours')
      .toISOString();
    const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString();
    const dentistId = req.body.dentistId;
    const appointments = await Appointment.find({
      dentistId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: 'Appointments not available',
        success: false,
      });
    } else {
      return res.status(200).send({
        message: 'Appointments available',
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error booking appointment',
      success: false,
      error,
    });
  }
});

router.get('/get-appointments-by-user-id', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.body.userId });
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
});

export default router;
