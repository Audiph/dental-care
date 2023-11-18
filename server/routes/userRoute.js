import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

const router = express.Router();

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
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default router;
