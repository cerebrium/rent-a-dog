const express = require('express');
const router = express.Router();
const User = require('../models/user');

    // Post new favourite dog to database
    router.post('/savephoto', (req, res) => {
        console.log(req.body)
        User.findById(req.params.uid, (err, user) => {
            user.favoriteDogs.push({
                apiID: req.params.id,
                name: req.params.name,
                photo: req.params.photo
            })
            user.save()
            console.log(user.favoriteDogs)
        })
    })

    // Retrieve all favourited dogs from database
    router.get('/:uid', (req, res) => {
        console.log('-------------------------- hitting the get favorites route', req.params.uid)
        User.findById(req.params.uid, (err, user) => {
            res.json(user)
        })
    })


module.exports = router;