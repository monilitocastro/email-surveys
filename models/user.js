const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    subject: String,
    credits: {
        type: Number,
        default: 0
    }
})

const UserClass = mongoose.model('users', userSchema);


module.exports = UserClass;