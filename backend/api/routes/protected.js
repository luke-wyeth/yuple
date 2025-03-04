import express from 'express'  // Import express using ESM syntax
import authMiddleware from '../../middleware/auth.js'  // Import authMiddleware using ESM syntax

const router = express.Router()

router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to your dashboard!' })
})

export default router  // Use export default for ESM
