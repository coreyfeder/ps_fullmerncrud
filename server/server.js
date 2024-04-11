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
    console.debug("Hello, world!")
    res.json({"hello": "world"})
});

// read all
app.get("/notes", async (req, res) => {
    const notes = await Note.find();
    console.debug(`Notes found: ${notes.length}`)
    res.json({notes: notes})
});

// read one
app.get("/notes/:note_id", async (req, res) => {
    const note_id = req.params.note_id;
    const notes = await Note.findById(note_id);
    // console.debug(`Note ${note_id} result: ${notes}`)
    if (!(notes)) {
        console.debug(`Requested note_id "${note_id}" did not match any records.`)
    } else {
        console.debug(`Note ${note_id} found.`)
    }
    res.json({notes: notes})
});

// create
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
    console.debug(`Note ${note._id} created.`)
    res.json({note: note})
});

// update (replace)
app.post("/notes/:note_id", async (req, res) => {
    console.debug("DEBUG: U-post: Note ID: ", req.params.note_id)
    console.debug("DEBUG: U-post: New body: ", req.body)
    const note_id = req.params.note_id;
    let notes;
    notes = await Note.findById(note_id);
    console.debug("DEBUG: Found? ", notes)
    if (!(notes)) {
        console.debug(`DEBUG: Requested note_id "${note_id}" did not match any records.`)
    } else {
        console.debug(`DEBUG: Note_id "${note_id}" found: `, notes)
        console.debug("DEBUG: New body: ", req.body)
        // notes = await Note.findOneAndReplace( { _id: note_id }, req.body )
        notes = await Note.findByIdAndUpdate(
            note_id, req.body, options={returnDocument: 'after', new: true, upsert: false}
        )
    }
    res.json({notes: notes})
});

// update (by field)
app.put("/notes/:note_id", async (req, res) => {
    console.debug("DEBUG: U-put: Note ID: ", req.params.note_id)
    console.debug("DEBUG: U-put: New body: ", req.body)
    const note_id = req.params.note_id;
    let notes;
    notes = await Note.findById(note_id);
    console.debug("DEBUG: Found? ", notes)
    if (!(notes)) {
        console.debug(`DEBUG: Requested note_id "${note_id}" did not match any records.`)
    } else {
        console.debug(`DEBUG: Note_id "${note_id}" found: `, notes)
        console.debug("DEBUG: New body: ", req.body)
        // notes = await Note.findOneAndReplace( { _id: note_id }, req.body )
        // notes = await Note.updateOne(
        notes = await Note.findByIdAndUpdate(
            note_id, req.body, options={returnDocument: 'after', new: true, upsert: false}
        )
    }
    res.json({notes: notes})
});

// different axis
// app.route("/tasks")
//     .all()
//     .get()
//     .post()



// start
app.listen(PORT)
console.log(`Server listening on port ${PORT}.`)
