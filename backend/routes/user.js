import express from 'express'  // Import express using ESM syntax
import { fetchUserMeData } from '../db/user.js'  // Import the required function using ESM syntax

const router = express.Router()

router.get("/", (req, res) => res.send("USERS root"))

router.get("/me", (req, res) => {
  fetchUserMeData().then((data) => {
    res.send(data)
  })
})

export default router  // Use export default for ESM
