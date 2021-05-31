const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "default"
    },
    games: {
        type: [{type: Schema.Types.ObjectId, ref: 'game'}],
        required: false
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
