import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken // Get token from cookie
  console.log(req.cookies)
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded.userId // Attach user data to the request
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export default authMiddleware
