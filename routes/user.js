const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware.js");
const User = require("../models/User");

// Get current user profile
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});

// Update profile
router.put("/update", auth, async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
  res.json(updated);
});

// Swipe right (like)
router.post("/like/:id", auth, async (req, res) => {
  const currentUser = await User.findById(req.user.id);
  const likedUser = await User.findById(req.params.id);

  if (likedUser.liked.includes(currentUser._id)) {
    currentUser.matches.push(likedUser._id);
    likedUser.matches.push(currentUser._id);
    await currentUser.save();
    await likedUser.save();
    return res.json({ match: true });
  }

  currentUser.liked.push(likedUser._id);
  await currentUser.save();
  res.json({ match: false });
});

module.exports = router;
