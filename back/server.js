const express = require('express');
const cors = require('cors');
require('dotenv').config()
const runChat = require('./GeminiChatBot');

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
    console.log("prompt ", req.body)
    const prompt = req.body.prompt;
    const response = await runChat(prompt);

    res.status(200).json({ response });
})

app.listen(3000, console.log("app listening on port 3000"))