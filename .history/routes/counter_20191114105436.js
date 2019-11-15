const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    //Where User is you mongoose user model
    User.find({} , (err, users) => {
        var myList = []
        var result = []
        var myArray = []
        users.map(user => {
            for (dog in user.favoriteDogs) {
                myList.push(user.favoriteDogs[dog].apiID)
                myList.push(user.favoriteDogs[dog].name)
            }
        })
        // get all dogs from all users
            for (let i=0; i<myList.length; i+=2) {
                let myString = myList[i]+myList[i+1]
                myArray.push(myString)
            }
        var myDogObj = new Object();
        const results = myArray.filter(function(item, index) {
            if (myArray.indexOf(item) === index) {
                return myDogObj[''+item] = 1
            } else {
                return myDogObj[''+item] = myDogObj[''+item] += 1
            }
        })
        Object.keys(myDogObj).map(function(key) {
            result.push([key.match(/\D/g), myDogObj[key]])
        });
        res.json(result)
    })
})

module.exports = router;