const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    createdAt: {
        type: Number,
        required: false
    },
    lastMoveAt: {
        type: Number,
        required: false
    },
    moves: {
        type: [String],
        required: true
    },
    perf: {
        type: String,
        required: false,
        default: "Classical"
    },
    speed: {
        type: String,
        required: false
    },
    ownerUserName: {
        type: String,
        required: true
    },
    ownerColor: {
        type: String,
        required: true
    },
    winner: {
        type: Boolean,
        required: false
    },
    analysis: {
        type: [ // For every move
                [ // There are multiple primary variations
                    {
                        score: Number,
                        moves: [String] // For which there are multiple moves
                    }
                ]
        ],
        required: false
    },
    analyzed: {
        type: Boolean,
        default: false
    }
});

const Game = mongoose.model('game', GameSchema)

module.exports = Game;
