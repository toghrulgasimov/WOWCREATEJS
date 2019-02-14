const mongoose = require('mongoose');
const validator = require('validator');


let ContestantSchema = new mongoose.Schema({
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
    },
    image: {
        type: String
    },
    words : []
});

let WowContestant = mongoose.model('WowContestant', ContestantSchema);

module.exports = {WowContestant}