const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    //Where User is you mongoose user model
    User.find({} , (err, users) => {
        var myList = users.map(user => {
            for (name in user) {
                console.log(user[name])
            }
            console.log(`User.favoriteDogs =======> ${user.favoriteDogs.name}`)
            //Do somethign with the user
            return user.favoriteDogs.name
        })
        console.log(myList)
        res.json(myList)
    })
})

module.exports = router;