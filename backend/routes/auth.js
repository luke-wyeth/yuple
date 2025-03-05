import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user.js'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Ensure password is provided
    if (!password) {
      return res.status(400).json({ error: 'Password is required', body: req.body })
    }

    // Check if user already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'Email already in use' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10) // 10 is the salt rounds

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword })
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

    // Ensure password is provided
    if (!password) {
      return res.status(400).json({ error: 'Password is required' })
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'Invalid email' })
    }

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    const accessToken = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' })
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
  
    user.refreshToken = refreshToken;
    await user.save();
  
    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Refresh token route with rotation
router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body

  if (!refreshToken) return res.status(401).json({ error: 'Refresh token required' })

  try {
    // return res.status(403).json({data: jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)})
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
    const user = await User.findById(decoded.userId)
    
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ error: 'Invalid refresh token', test: user })
    }

    // Generate new access token
    const accessToken = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' })

    // Generate new refresh token (rotation)
    const newRefreshToken = jwt.sign({ userId: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

    // Update refresh token in the database
    user.refreshToken = newRefreshToken
    await user.save()

    res.json({ accessToken, refreshToken: newRefreshToken }) // Send both tokens back
  } catch (err) {
    res.status(403).json({ error: 'Invalid refresh token', log: err })
  }
})

// Logout route
router.post('/logout', async (req, res) => {
    const {refreshToken} = req.body

    try{
        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
        const user = await User.findById(decoded.userId)

        if(user){
            user.refreshToken = null
            await user.save()
        }

        res.status(200).json({ message: 'Logout successful' })
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

export default router