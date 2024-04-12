const Note = require('../models/note.js');

// read all
const fetchNotes = async (req, res) => {
    console.debug("DEBUG: notes > read all")
    const notes = await Note.find();
    res.json({notes: notes})
};

// read one
const fetchNoteById = async (req, res) => {
    console.debug("DEBUG: notes > read one > ", req.params.note_id)
    const note_id = req.params.note_id;
    const notes = await Note.findById(note_id);
    if (!(notes)) {
        console.debug(`Requested note_id "${note_id}" did not match any records.`)
    }
    res.json({notes: notes})
};

// create
const createNote = async (req, res) => {
    console.debug("DEBUG: notes > create")
    const note = await Note.create({
        title: req.body.title,
        body: req.body.body,
    });
    console.debug(`Note ${note._id} created.`)
    res.json({note: note})
};

// update (replace) (no upsert)
const replaceNote = async (req, res) => {
    const note_id = req.params.note_id;
    let notes;
    notes = await Note.findById(note_id);
    if (!(notes)) {
        console.log(`DEBUG: Attempted replace: ID did not match any records: `, note_id)
    } else {
        notes = await Note.findOneAndReplace(
            { _id: note_id },
            req.body,
            options={new: true, lean: true},
        )
    }
    res.json({result: notes})
};

// update (by field) (no upsert)
const updateNote = async (req, res) => {
    const note_id = req.params.note_id;
    let notes;
    notes = await Note.findById(note_id);
    if (!(notes)) {
        console.log(`DEBUG: Attempted update: ID did not match any records: `, note_id)
    } else {
        notes = await Note.findByIdAndUpdate(
            note_id,
            req.body,
            options={new: true, upsert: false, lean: true, remove: false},
        )
    }
    res.json({ result: notes })
};

// delete one
const deleteNote = async (req, res) => {
    console.debug("DEBUG: notes > delete one > ", req.params.note_id)
    const note_id = req.params.note_id;
    const result = await Note.findByIdAndDelete(note_id);
    res.json({ result: result })
};

module.exports = {
    fetchNotes: fetchNotes,
    fetchNoteById: fetchNoteById,
    createNote: createNote,
    replaceNote: replaceNote,
    updateNote: updateNote,
    deleteNote: deleteNote,
}
