const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
            // console.log(user.authenticated(user.password))
            console.log(localStorage)
        res.json(user)
    })
})


module.exports = router;