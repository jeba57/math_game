const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Game = require("./models/Game");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/math_duel", { useNewUrlParser: true });

app.post("/submit", async (req, res) => {
    const { player, round, operation, timeTaken } = req.body;
    await Game.create({ player, round, operation, timeTaken });
    res.json({ message: "Score saved!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
