const path = require('path');

module.exports = (app) => {
// this should return the notes.html file.
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });
// this should return the index.html file.
  app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  })
};