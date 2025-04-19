// controllers/bioController.js
const Bio = require('../models/bio');
const User = require('../models/User');

// Add Bio
exports.addBio = async (req, res) => {
    try {
        const userId = req.user.id; // From JWT middleware (authenticated user)

        // Check if the user already has a bio
        let bio = await Bio.findOne({ user: userId });

        if (bio) {
            // If bio exists, update it
            bio.bio = req.body.bio;
        } else {
            // If no bio exists, create a new one
            bio = new Bio({
                user: userId,
                bio: req.body.bio
            });
        }

        // Save the bio
        await bio.save();
        res.status(200).json({ message: 'Bio updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// Get Bio
exports.getBio = async (req, res) => {
    try {
        const userId = req.user.id; // From JWT middleware (authenticated user)

        const bio = await Bio.findOne({ user: userId });

        if (!bio) {
            return res.status(404).json({ message: 'Bio not found' });
        }

        res.status(200).json({ bio: bio.bio });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
