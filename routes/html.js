const path = require('path');

module.exports = (memo) => {

  memo.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  memo.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  })
};