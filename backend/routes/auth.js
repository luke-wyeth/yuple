import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Ensure password is provided
    if (!password) {
      return res.status(400).json({ error: 'Password is required', body: req.body });
    }

    // Check if user already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ensure password is provided
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
