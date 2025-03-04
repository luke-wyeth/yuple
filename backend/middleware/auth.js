import express from 'express'   // Replace require with import
import jwt from 'jsonwebtoken'  // Replace require with import
import bcrypt from 'bcryptjs'  // Import bcryptjs using ESM syntax
import User from '../models/user.js'  // Replace require with import (ensure correct path)
import dotenv from 'dotenv'     // Replace require with import

dotenv.config()  // Load environment variables

const router = express.Router()

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'

// JWT authentication middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Check if user already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'Email already in use' })
    }

    // Create new user
    const newUser = new User({ username, email, password })
    await newUser.save()

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, { expiresIn: '1h' })

    res.status(201).json({ message: 'User registered successfully', token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' })

    res.status(200).json({ message: 'Login successful', token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Example of a protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user })
})

export default router  // Use export default for ES module
