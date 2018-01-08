const mongoose = require('mongoose');

const recipientSchema = mongoose.Schema({
    email: String,
    responded: {
        type: Boolean,
        default: false
    }
})

const RecipientClass = mongoose.model('recipients', recipientSchema);


module.exports = {RecipientClass,RecipientSchema: recipientSchema};