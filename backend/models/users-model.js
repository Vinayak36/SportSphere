// backend/models/users-model.js

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate emails
      lowercase: true,
    },
    profilePicture: {
      type: String, // Base64 or image URL
      required: false,
    },
    uid: {
      type: String, // Unique user identifier
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
        type: String,
        required: true,
    }
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` fields
);

// Automatically set `uid` to `_id.toString()` before saving
UserSchema.pre('save', function (next) {
  if (!this.uid) {
    this.uid = this._id.toString(); // Ensure `uid` mirrors the `_id` value
  }
  next();
});

export default mongoose.model('User', UserSchema);

