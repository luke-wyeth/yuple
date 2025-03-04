import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded.userId // Attach user data to the request
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

export default authMiddleware;
