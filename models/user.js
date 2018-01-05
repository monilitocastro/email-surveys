const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    googleId: String
})

const UserClass = mongoose.model('users', userSchema);


module.exports = UserClass;