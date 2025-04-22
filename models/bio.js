// models/Bio.js
const mongoose = require('mongoose');

const BioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  bio: { type: String, required: true }, // Bio text
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  age: { type: Number, required: true },
  location: {
    city: { type: String },
    country: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  interests: [{ type: String }], // Array of interests or hobbies
  photos: {
    type: [String], // Array of image URLs or file paths
    validate: [arrayLimit, '{PATH} exceeds the limit of 5']
  }
}, { timestamps: true });

// Custom validator for max 5 photos
function arrayLimit(val) {
  return val.length <= 5;
}

const Bio = mongoose.model('Bio', BioSchema);

module.exports = Bio;
