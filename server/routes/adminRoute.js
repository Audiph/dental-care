import express from 'express';
import User from '../models/userModel.js';
import Dentist from '../models/dentistModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/get-all-dentists', authMiddleware, async (_, res) => {
  try {
    const dentists = await Dentist.find({});
    res.status(200).send({
      message: 'Dentists fetched successfully',
      success: true,
      dentists,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error applying dentist account',
      success: false,
      error,
    });
  }
});

router.get('/get-all-users', authMiddleware, async (_, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: 'Users fetched successfully',
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error applying dentist account',
      success: false,
      error,
    });
  }
});

router.post(
  '/change-dentist-account-status',
  authMiddleware,
  async (req, res) => {
    try {
      const { dentistId, status } = req.body;
      const dentist = await Dentist.findByIdAndUpdate(dentistId, {
        status,
      });

      const user = await User.findOne({ _id: dentist.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: 'new-dentist-request-changed',
        message: `Your dentist account has been ${status}`,
        onClickPath: '/notifications',
      });
      user.isDentist = status === 'approved' ? true : false;
      await user.save();

      res.status(200).send({
        message: 'Dentist status updated successfully',
        success: true,
        dentist,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: 'Error applying dentist account',
        success: false,
        error,
      });
    }
  }
);

module.exports = router;
