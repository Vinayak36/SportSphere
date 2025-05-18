import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users-model.js';
import JWT_SECRET from '../secret_stuff.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Password validation logic
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    // const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '12h' });
    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    // Set the token as an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      // secure: process.env.NODE_ENV === 'production', // Ensures cookies are only sent over HTTPS in production
      // sameSite: 'strict', // Helps prevent CSRF attacks
      secure: false,
      maxAge: 12 * 60 * 60 * 1000, // 12 hours in milliseconds
    });

    res.status(200).json({ message: 'Logged in successfully', userId: user._id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});


router.post('/users-logout', (req, res) => {
  try {
    // Clear the authentication cookie
    res.clearCookie('token', {
      httpOnly: true, // Ensures the cookie is not accessible via client-side JavaScript
      // secure: process.env.NODE_ENV === 'production', // Set to true in production (requires HTTPS)
      // sameSite: 'strict', // Prevent CSRF attacks
      secure: false,
    });

    // Optionally handle session invalidation here, e.g., by removing a token from the database.

    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});




router.get('/auth/api/check', (req, res) => {
  const token = req.cookies.token; // Assuming the token is stored in the 'token' cookie

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); 
    res.status(200).json({ message: 'Authenticated', user: decoded });
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
});


export default router;
