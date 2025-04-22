// controllers/bioController.js
const Bio = require('../models/bio');
const User = require('../models/User');

// Add or Update Bio
exports.addBio = async (req, res) => {
    try {
        const userId = req.user.id;

        const bioData = {
            bio: req.body.bio,
            gender: req.body.gender,
            age: req.body.age,
            location: req.body.location, // { city, country, coordinates: { lat, lng } }
            interests: req.body.interests, // array
            photos: req.body.photos // array (max 5 items)
        };

        let bio = await Bio.findOne({ user: userId });

        if (bio) {
            // Update existing bio
            Object.assign(bio, bioData);
        } else {
            // Create new bio
            bio = new Bio({ user: userId, ...bioData });
        }

        await bio.save();
        res.status(200).json({ message: 'Bio saved successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};


// Get Bio
exports.getBio = async (req, res) => {
    try {
        const userId = req.user.id;

        const bio = await Bio.findOne({ user: userId });

        if (!bio) {
            return res.status(404).json({ message: 'Bio not found' });
        }

        res.status(200).json(bio); // Send full bio object
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

