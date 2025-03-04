import express from 'express'  // Import express using ESM syntax
import { fetchLastName } from '../db/user.js'  // Import the required function using ESM syntax

const router = express.Router()

router.get("/", (req, res) => res.send("USERS root"))

router.get("/lastname/:firstname", (req, res) => {
  let firstname = req.params.firstname
  fetchLastName(firstname).then((lastname) => {
    res.send(lastname)
  })
})

export default router  // Use export default for ESM
