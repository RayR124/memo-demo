const fs = require('fs')
const path = require('path');

var uuid = require('../public/helper/uuid');

module.exports = (app) => {

  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });

  app.post('/api/notes', (req, res) => {
    let dataBase = fs.readFileSync('db/db.json');
    dB = JSON.parse(dataBase);
    res.json(dB);

    let Notes = {
      title: req.body.title,
      text: req.body.text,

      id: uuid(),
    };

    dB.push(Notes);
    fs.writeFileSync('db/db.json', JSON.stringify(dB));
    res.json(dB);
  });

  app.delete('/api/notes/:id', (req, res) => {

    let db = JSON.parse(fs.readFileSync('db/db.json'))

    let deleteNotes = db.filter(item => item.id !== req.params.id);

    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
  })
};