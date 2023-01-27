const fs = require('fs')
const path = require('path');
var helper = require('../public/assets/helper/helper');

module.exports = (app) => {

  //this should read the db.json file and return all saved notes as JSON
  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });
// this should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
  app.post('/api/notes', (req, res) => {
    let dataBase = fs.readFileSync('db/db.json');
    dB = JSON.parse(dataBase);
    res.json(dB);
    let Notes = {
      title: req.body.title,
      text: req.body.text,
      id: helper(),
    };
    dB.push(Notes);
    fs.writeFileSync('db/db.json', JSON.stringify(dB));
    res.json(dB);
  });
// [bonus] this should remove the note with the given id property, and then rewrite the notes to the db.json file
  app.delete('/api/notes/:id', (req, res) => {
    let db = JSON.parse(fs.readFileSync('db/db.json'))
    let deleteNotes = db.filter(item => item.id !== req.params.id);
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
  })
};