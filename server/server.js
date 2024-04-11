if (process.env.MODE != "production" ) {
    require("dotenv").config();
}
// import express from 'express';  // only if modulizing
const express = require("express");
const connectDB = require("./config/db");

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

app.post("/notes", (req, res) => {
    // get body request
    // create note
    // respond with new note
});

// start
app.listen(PORT)
