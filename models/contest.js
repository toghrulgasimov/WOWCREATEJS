const mongoose = require('mongoose');
const validator = require('validator');


let ContestSchema = new mongoose.Schema({
    duration: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    players: [{
        _id: {
            type: String
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        rank: {
            type: Number
        },
        score: {
            type: Number
        }
    }]
});

let Contest = mongoose.model('WowContest', ContestSchema);

module.exports = {Contest}