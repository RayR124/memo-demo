const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
const api = require("./api/notes");
const path = require("path");
const uuid = require("uuid");

const app = express();
const port = process.env.port || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", api);

require('./routes/api')(app);
require('./routes/html')(app);

app.listen(port, () => {
    console.log(`Server listening at localhost${port}`);
});

// //this should read the db.json file and return all saved notes as JSON
app.get("./api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"))
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
});

// this should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
app.post("./api/notes", (req, res) => {
    const note = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNote = req.body;
    newNote.id = uuid.v4();
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(note));
    res.json(notes);
});

// this should remove the note with the given id property, and then rewrite the notes to the db.json file
app.delete("./api/notes/:id", (req, res) => {
    const note = JSON.parse(fs.readFileSync("./db/db.json"));
    const deleteNote = note.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));
    res.json(deleteNote);
});

// this should return the index.html file.
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// this should return the notes.html file.
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});