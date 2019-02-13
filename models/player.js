const mongoose = require('mongoose');
const validator = require('validator');


let WowPlayerSchema = new mongoose.Schema({
    mission: {
        type: Number,
        required: true
    },
    score:{
        type: Number,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true
    }
});

let WowPlayer = mongoose.model('WowPlayer', WowPlayerSchema);

module.exports = {WowPlayer}