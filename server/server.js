if (process.env.MODE != "production" ) {
    require("dotenv").config();
}
// import express from 'express';  // only if modulizing
const express = require("express");
const connectDB = require("./config/db");
const notesController = require("./controllers/notesController.js");

const PORT = process.env.PORT

// create & configure express app
const app = express();
app.use(express.json());

// connect to DB
connectDB();

// routes
// org method #1: by Action
app.get("/notes", notesController.fetchNotes);  // read all
app.get("/notes/:note_id", notesController.fetchNoteById);  // read one
app.post("/notes", notesController.createNote);  // create
app.post("/notes/:note_id", notesController.replaceNote);  // update (replace) (no upsert)
app.put("/notes/:note_id", notesController.updateNote);  // update (by field) (no upsert)
app.delete("/notes/:note_id", notesController.deleteNote);  // delete one

// org method #2: by Route
/*
app.route("/notes")
    .get(notesController.fetchNotes)
    .post(notesController.createNote);

app.route("/notes/:note_id")
    .get(notesController.fetchNoteById)
    .post(notesController.replaceNote)
    .put(notesController.updateNote)
    .delete(notesController.deleteNote);
 */


// start
app.listen(PORT)
console.log(`Server listening on port ${PORT}.`)
