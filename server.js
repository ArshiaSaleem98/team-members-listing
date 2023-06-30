const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();

const db = new sqlite3.Database('./db/teams_members.db');
app.get('/teams', (req, res) => {
  db.all('SELECT * FROM Team', (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

const port = 3000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
