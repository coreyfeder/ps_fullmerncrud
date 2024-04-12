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
    console.debug("DEBUG: notes > read all")
    const notes = await Note.find();
    // console.debug(`Notes found: ${notes.length}`)
    res.json({notes: notes})
});

// read one
app.get("/notes/:note_id", async (req, res) => {
    console.debug("DEBUG: notes > read one > ", req.params.note_id)
    const note_id = req.params.note_id;
    const notes = await Note.findById(note_id);  // easy way
    // const notes = await Note.find({ _id: note_id });  // hard way
    // console.debug(`Note ${note_id} result: ${notes}`)
    if (!(notes)) {
        console.debug(`Requested note_id "${note_id}" did not match any records.`)
    // } else {
        // console.debug(`Note ${note_id} found.`)
    }
    res.json({notes: notes})
});

// create
app.post("/notes", async (req, res) => {
    console.debug("DEBUG: notes > create")
    // get note from body request
    // const title = req.body.title;
    // const body = req.body.body;
    // create note
    const note = await Note.create({
        // any benefit to using the indermediary variables other than debugging?
        // title: title,
        // body: body,
        title: req.body.title,
        body: req.body.body,
    });
    // respond with new note
    console.debug(`Note ${note._id} created:  `, note)
    res.json({note: note})
});


// update (replace) (no upsert)
app.post("/notes/:note_id", async (req, res) => {
    console.debug("DEBUG: notes > update (replace) > ", req.params.note_id)
    console.debug("DEBUG: new body: ", req.body)
    const note_id = req.params.note_id;
    let notes;
    notes = await Note.findById(note_id);
    // console.debug("DEBUG: former value: ", await Note.findById(note_id))
    console.debug("DEBUG: former value: ", notes)
    if (!(notes)) {
        console.log(`DEBUG: Requested note_id "${note_id}" did not match any records.`)
    } else {
        console.debug(`DEBUG: Note_id "${note_id}" found: `, notes)
        notes = await Note.findOneAndReplace(
            { _id: note_id },
            req.body,
            options={new: true, lean: true}
        )
    }
    console.debug("DEBUG: new value: ", notes)
    res.json({notes: notes})
});


// update (by field) (no upsert)
app.put("/notes/:note_id", async (req, res) => {
    console.debug("DEBUG: notes > update (by field) > ", req.params.note_id)
    console.debug("DEBUG: new body: ", req.body)
    const note_id = req.params.note_id;
    let notes;
    notes = await Note.findById(note_id);
    if (!(notes)) {
        console.log(`DEBUG: Requested note_id "${note_id}" did not match any records.`)
    } else {
        // console.debug(`DEBUG: Note_id "${note_id}" found: `, notes)
        notes = await Note.findByIdAndUpdate(
            note_id, req.body, options={new: true, upsert: false, lean: true, remove: false}
        )
    }
    res.json({notes: notes})
});

// delete one
app.delete("/notes/:note_id", async (req, res) => {
    console.debug("DEBUG: notes > delete one > ", req.params.note_id)
    const note_id = req.params.note_id;
    const before = await Note.findById(note_id);
    // const response = await Note.deleteOne({ _id: note_id });  // oh, you dummy
    const response = await Note.findByIdAndDelete(note_id);
    // console.debug(`Note ${note_id} result: ${notes}`)
    // if (!(notes)) {
    //     console.debug(`Requested note_id "${note_id}" did not match any records.`)
    // } else {
    //     console.debug(`Note ${note_id} found.`)
    // }
    const after = await Note.findById(note_id);
    res.json({response: response, before: before, after: after})
});



// different axis
// app.route("/tasks")
//     .all()
//     .get()
//     .post()



// start
app.listen(PORT)
console.log(`Server listening on port ${PORT}.`)
