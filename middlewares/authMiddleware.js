const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  // Extract token from Authorization header
  const token = req.header('Authorization');

  // If no token, send a response with a 401 status
  if (!token) {
    return res.status(401).json({ msg: 'No token, access denied' });
  }

  try {
    // Verify token and decode it
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

    // Attach decoded user data to request object for later use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // In case of error, respond with 400 status and token invalid message
    console.error('JWT Error:', err); // Optional: log the error for debugging
    res.status(400).json({ msg: 'Token not valid' });
  }
}

module.exports = auth;
