const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    todos: [
        {
            title:{
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true
            },
            completed: {
                type: Boolean,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('Users', UserSchema);