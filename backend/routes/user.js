import express from 'express'  // Import express using ESM syntax
import { fetchUserData } from '../db/user.js'  // Import the required function using ESM syntax
import authMiddleware from '../middleware/auth.js'  // Import authMiddleware using ESM syntax

const router = express.Router()

router.get("/", (req, res) => res.send("USERS root"))

router.get("/me", authMiddleware, (req, res) => {
    try {
        fetchUserData(req.user).then((data) => {
            res.send(data)
        })
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message })
    }
})

export default router  // Use export default for ESM
