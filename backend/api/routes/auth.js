import express from 'express'  // Import express using ESM syntax
import bcrypt from 'bcryptjs'  // Import bcryptjs using ESM syntax
import jwt from 'jsonwebtoken'  // Import jwt using ESM syntax
import User from '../../models/user.js'  // Import User model using ESM syntax (adjust the path if needed)

const router = express.Router()
const SECRET_KEY = 'your-secret-key'  // Store this in .env for security

// Register
router.post('/register', async (req, res) => {
  // const { username, email, password } = req.body
  // const hashedPassword = await bcrypt.hash(password, 10)

  try {
    // const user = new User({ username, email, password: hashedPassword })
    // await user.save()
    res.json({ message: '123', hello: '123', body: req.body })
  } catch (err) {
    res.status(400).json({ error: 'User already exists' })
  }
})

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' })
  res.json({ token })
})

export default router  // Export the router using ESM syntax
