const mongoose = require('mongoose');
const RecipientSchema = require('./recipient').RecipientSchema;

const surveySchema = mongoose.Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: {
        type: Number,
        default: 0
    },
    no: {
        type: Number,
        default: 0
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateSent: Date,
    lastResponded: Date
})

const SurveyClass = mongoose.model('surveys', surveySchema);


module.exports = SurveyClass;