const path = require('path');

module.exports = (memo) => {
// this should return the notes.html file.
  memo.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });
// this should return the index.html file.
  memo.get('', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  })
};