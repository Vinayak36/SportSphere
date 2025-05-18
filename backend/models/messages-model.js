// models/Message.js
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  participants: {
    type: [mongoose.Schema.Types.ObjectId], // Array of user IDs
    ref: 'users', // Assuming users are stored in the 'User' collection
    required: true,
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId, // User ID of the recipient
    ref: 'users',
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId, // User ID of the sender
    ref: 'users',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set the current timestamp
  },
});

export default mongoose.model('Message', MessageSchema);
