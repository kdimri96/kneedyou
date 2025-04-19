// models/Bio.js
const mongoose = require('mongoose');

const BioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // reference to User model
  bio: { type: String, required: true },  // the bio text
}, { timestamps: true });

const Bio = mongoose.model('Bio', BioSchema);

module.exports = Bio;
