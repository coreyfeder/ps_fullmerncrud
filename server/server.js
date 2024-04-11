if (process.env.MODE != "production" ) {
    require("dotenv").config();
}
// import express from 'express';  // only if modulizing
const express = require("express");
const connectDB = require("./config/db");
const Note = require('./models/note.js');

const PORT = process.env.PORT

// create & configure express app
const app = express();
app.use(express.json());

// connect to DB
connectDB();

// routes
app.get("/", (req, res) => {
    // res.send("Hello, world.")
    res.json({"hello": "world"})
});

app.post("/notes", async (req, res) => {
    // get body request
    const title = req.body.title;
    const body = req.body.body;
    // res.json({post: "note", title: title, body: body})
    // create note
    const note = await Note.create({
        title: title,
        body: body,
    });
    // respond with new note
    res.json({note: note})
});

// start
app.listen(PORT)
console.log(`Server listening on port ${PORT}.`)
