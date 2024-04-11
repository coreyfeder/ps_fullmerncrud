const mongoose = reauire("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    body: String,
})

const Note = mongoose.model('Note', noteSchema)
