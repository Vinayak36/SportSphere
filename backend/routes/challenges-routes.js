import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import Challenge from '../models/challenges-model.js';
import Message from '../models/messages-model.js';

const router = express.Router();

// @route   GET /api/challenges
// @desc    Get all challenges available
// @access  Protected
router.get('/', verifyToken, async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching challenges', error: error.message });
  }
});

// @route   GET /api/profile/for_challenge_accept_delete
// @desc    Get user data for challenge operations
// @access  Protected
router.get('/profile/for_challenge_accept_delete', verifyToken, async (req, res) => {
  try {
    // Respond with user details from the token
    res.status(200).json({
      for_c_a_d_user: { id: req.user.id, username: req.user.username },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user data', error: error.message });
  }
});

// @route   POST /api/messages
// @desc    Send a message for accepting a challenge
// @access  Protected
router.post('/messages', verifyToken, async (req, res) => {
  const { text, recipientId } = req.body;

  if (!text || !recipientId) {
    return res.status(400).json({ message: 'Text and recipientId are required' });
  }

  try {
    const newMessage = new Message({
      text,
      senderId: req.user.id,
      recipientId,
      participants: [req.user.id, recipientId],
      timestamp: new Date(),
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending message', error: error.message });
  }
});

// @route   POST /api/challenges/create
// @desc    Create a new challenge
// @access  Protected
router.post('/create', verifyToken, async (req, res) => {
  const { sport, availableFrom, availableTo, timing, username } = req.body;

  // Input validation
  if (!sport || !availableFrom || !availableTo || !timing) {
    return res.status(400).json({ message: 'All fields are required to create a challenge' });
  }

  try {
    const newChallenge = new Challenge({
      userId: req.user.id,
      username,
      sport,
      availableFrom: new Date(availableFrom),
      availableTo: new Date(availableTo),
      timing,
      createdAt: new Date(),
    });

    await newChallenge.save();
    res.status(201).json({ message: 'Challenge created successfully', challenge: newChallenge });
  } catch (error) {
    console.error('Error while creating challenge:', error);
    res.status(500).json({ message: 'Server error occurred', error: error.message });
  }
});

// @route   DELETE /api/challenges/:id
// @desc    Delete a specific challenge
// @access  Protected
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const challenge = await Challenge.findById(id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Ensure the user deleting the challenge is the creator
    if (challenge.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to delete this challenge' });
    }

    await Challenge.findByIdAndDelete(id);
    res.status(200).json({ message: 'Challenge deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting challenge', error: error.message });
  }
});

export default router;
