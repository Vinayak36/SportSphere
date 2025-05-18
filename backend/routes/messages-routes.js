import express from 'express';
import cookieParser from 'cookie-parser'; // Ensure this is included in your app
import jwt from 'jsonwebtoken';
import Message from '../models/messages-model.js';
import User from '../models/users-model.js';
import JWT_SECRET from '../secret_stuff.js';

const router = express.Router();

// Middleware to verify the token from cookies
const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token; // Adjust to match your cookie name
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, JWT_SECRET); // Use your JWT secret
        req.user = decoded; // Attach user data to the request object
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

// Route: Get user's contacts
router.get('/', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const messages = await Message.find({ participants: userId })
            .select('participants timestamp')
            .sort({ timestamp: -1 });

        const contactIds = new Set();
        messages.forEach((message) => {
            message.participants.forEach((participantId) => {
                if (participantId.toString() !== userId) contactIds.add(participantId.toString());
            });
        });

        const users = await User.find({ _id: { $in: Array.from(contactIds) } }).select('username');
        const contacts = users.map((user) => ({
            userId: user._id,
            username: user.username,
        }));

        res.status(200).json({ contacts });
    } catch (error) {
        console.error('Error fetching contacts:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route: Get messages between the current user and a recipient
router.get('/:recipientId', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { recipientId } = req.params;

        const messages = await Message.find({
            participants: { $all: [userId, recipientId] },
        }).sort({ timestamp: 1 });

        const recipient = await User.findById(recipientId).select('username');
        const recipientName = recipient ? recipient.username : 'Unknown User';

        res.status(200).json({ messages, recipientName, ok: true });
    } catch (error) {
        console.error('Error fetching messages:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route: Send a message
router.post('/', verifyToken, async (req, res) => {
    try {
        const { text, recipientId } = req.body;
        const senderId = req.user.id;

        if (!text || !recipientId) {
            return res.status(400).json({ message: 'Text and recipientId are required' });
        }

        const newMessage = new Message({
            participants: [senderId, recipientId],
            senderId,
            recipientId,
            text,
            timestamp: new Date(),
        });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error sending message:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
