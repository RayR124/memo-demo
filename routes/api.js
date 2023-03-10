const fs = require("fs")
const path = require("path");

module.exports = (app) => {

  //this should read the db.json file and return all saved notes as JSON
  app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });
  // this should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
  app.post("/api/notes", (req, res) => {
    const dataBase = fs.readFileSync("db/db.json");
    const db = JSON.parse(dataBase);
    let newNote = req.body;
    db.push(newNote);
    fs.writeFileSync("db/db.json", JSON.stringify(db));
    res.json(dataBase);
  });
  // [bonus] this should remove the note with the given id property, and then rewrite the notes to the db.json file
  app.delete("api/notes/:id", (req, res) => {
    let note = JSON.parse(fs.readFileSync("./db/db.json"));
    const deleteNote = note.filter((deleteNote) => deleteNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));
    res.json(deleteNote);
  })
};