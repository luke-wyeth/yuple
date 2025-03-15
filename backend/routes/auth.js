import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser' // Import cookie-parser

dotenv.config()

const router = express.Router()
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

router.use(cookieParser()) // Use cookie-parser middleware

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!password) {
      return res.status(400).json({ error: 'Password is required', body: req.body })
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'Email already in use' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })
    await newUser.save()

    const accessToken = jwt.sign({ userId: newUser._id }, SECRET_KEY, { expiresIn: '1h' })
    const refreshToken = jwt.sign({ userId: newUser._id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

    newUser.refreshToken = refreshToken
    await newUser.save()

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 604800000, // 7 Days
    })

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!password) {
      return res.status(400).json({ error: 'Password is required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'Invalid email' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    const accessToken = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' })
    const refreshToken = jwt.sign({ userId: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

    user.refreshToken = refreshToken
    await user.save()

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 604800000, // 7 Days
    })

    res.status(200).json({ message: 'Login successful' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Refresh token route with rotation
router.post('/refresh-token', async (req, res) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) return res.status(401).json({ error: 'Refresh token required' })

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
    const user = await User.findById(decoded.userId)

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ error: 'Invalid refresh token' })
    }

    const accessToken = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' })
    const newRefreshToken = jwt.sign({ userId: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

    user.refreshToken = newRefreshToken
    await user.save()

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    })
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 604800000,
    })

    res.json({ message: 'Token refreshed' })
  } catch (err) {
    res.status(403).json({ error: 'Invalid refresh token' })
  }
})

// Logout route
router.post('/logout', async (req, res) => {
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
  res.status(200).json({ message: 'Logout successful' })
})

export default router