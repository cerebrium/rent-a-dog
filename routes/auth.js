const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/edit', (req, res) => {
    var myObj = {
        name: req.body.name,
        email: req.body.email,
        photo: req.body.image,
        favoriteBreed: req.body.favoriteBreed
    }
    User.findByIdAndUpdate(req.body.id, myObj, (err, user) => {
        if (user) {
            console.log(`===================== This is the User: ${user}`)
            res.json(user)
        }
    })
})

router.post('/signup', (req, res) => {
    // find user based on email
    console.log('in the signup route')
    User.findOne({ email: req.body.email }, (err, user) => {
        // if user found wont write anything, else going to write to db
        // here is an awesome coment
       if (user) {
           res.json(user)
       } else {
            let user = new User(req.body)
            user.save();
            res.json(user)
       }
    })
})

module.exports = router