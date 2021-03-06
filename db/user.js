'use strict'

const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    },
    dictionary: [{
        word: {
            type: String,
            require: true,
            lowercase: true,
        },
        translates: {
            type: String,
            require: true,
            lowercase: true
        },
        ingame: {
            type: Boolean,
            default: true
        },
    }]
});

const User = mongoose.model('user', userSchema);

module.exports = User;