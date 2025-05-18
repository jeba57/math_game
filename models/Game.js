const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    player: String,
    round: Number,
    operation: String,
    timeTaken: Number
});

module.exports = mongoose.model("Game", GameSchema);
