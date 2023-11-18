import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

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

    res.status(200).send({ message: 'Login Successful', success: true, token });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error logging in user', error, success: false });
  }
});

export default router;
