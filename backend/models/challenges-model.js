// models/Challenge.js
import mongoose from 'mongoose';

const ChallengeSchema = new mongoose.Schema({
  availableFrom: {
    type: Date,
    required: true,
  },
  availableTo: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sport: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Evening', 'Night'], // Example fixed values
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // References the `users` collection
    ref: 'users',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Challenge', ChallengeSchema);
