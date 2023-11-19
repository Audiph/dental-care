import express from 'express';
import bcrypt from 'bcrypt';
import Dentist from '../models/dentistModel.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middlewares/authMiddleware.js';

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

export default router;
