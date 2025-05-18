import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/users-model.js';
import verifyToken from '../middleware/authMiddleware.js';
import JWT_SECRET from '../secret_stuff.js';
import multer from 'multer';
import path from 'path';


const router = express.Router();

// Get current user's data
router.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token; // Extract token from cookies
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const data = jwt.verify(token, JWT_SECRET); // Verify the token
    const user = await User.findById(data.id); // Find the user by ID

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// adding multer functionality :)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Directory for uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({storage: storage }) // it is a middleare

// Update profile route
router.put('/update', verifyToken, upload.single('profileImageForMulter'), async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findById(req.user.id); // Retrieve user from the database

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update username and email if provided
    if (username) user.username = username;
    if (email) user.email = email;

    // Update profile picture if a file was uploaded
    if (req.file) {
      console.log(req.file);
      user.profilePicture =  `http://localhost:8000/uploads/${req.file.filename}`
    }

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', 
      user ,
      profilePicture: `http://localhost:8000/uploads/${req.file.filename}`,
      url: `http://localhost:8000/uploads/${req.file.filename}`,

    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile', error: error.message });
  }
});

export default router;
