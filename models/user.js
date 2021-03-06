const mongoose = require('mongoose')

// Favorite Dogs Schema with photo
var favoriteDogsSchema = new mongoose.Schema({
    name: String,
    apiID: String,
    photo: String,
    email: String,
    phone: String,
    status: String,
    city: String,
    state: String
});

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength: [1, 'Name must be between 1 and 99 characters'],
        maxlength: [99, 'Name must be between 1 and 99 characters']
    },
    email:{
        type: String,
        minlength: [5, 'Email must be between 5 and 99 characters'],
        maxlength: [99, 'Email must be between 85and 99 characters']
    },
    photo: {
        type: String
    },
    favoriteBreed: String,
    favoriteDogs: [favoriteDogsSchema]
});


//Export the model
module.exports = mongoose.model('User', userSchema);