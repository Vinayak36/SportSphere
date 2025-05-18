// backend/routes/authRoutes.js
import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/check', verifyToken, (req, res) => {
  // If the token is valid, req.user will be populated
  res.status(200).json({ message: 'Authenticated', user: req.user });
});

export default router;
