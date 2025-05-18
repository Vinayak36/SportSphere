// backend/routes/users-signup-routes.js

import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/users-model.js'; // Adjust path if needed


const router = express.Router();



router.post('/signup', async (req, res) => {
  const { email, password, username, profilePicture } = req.body;

  try {
    // Check if the username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: 'Username already taken. Please choose another.' });
    }

    // Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: 'The email address is already in use by another account.' });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      'email': email,
      'username': username,
      'profilePicture': profilePicture,
      'password': password,
      // 'password': hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});




export default router;
