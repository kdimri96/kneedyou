const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  bio: String,
  gender: String,
  profilePicture: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
