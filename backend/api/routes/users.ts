const express = require("express");

const router = express.Router()

router.get("/", (req, res) => res.send("USERS root"));

const user = require("../db/user.ts")
router.get("/lastname/:firstname", (req, res) => {
    let firstname = req.params.firstname
    user.fetchLastName(firstname).then((lastname) => {
        res.send(lastname)
    })
})


module.exports = router