const express = require('express');
const router = express.Router();
const User = require('../models/user');
const axios = require('axios');

router.get('/:id', (req, res) => {
    User.findById(req.params.uid, (err, user) => {
        res.json(user)
    })
})


module.exports = router;