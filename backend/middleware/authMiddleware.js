// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import JWT_SECRET from '../secret_stuff.js';

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    req.user = decoded; // Attach the decoded user payload to the request
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default verifyToken;
