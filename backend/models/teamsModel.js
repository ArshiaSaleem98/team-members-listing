const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./db/teams_members.db');

// Get all existing teams
const getAllExistingTeams = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM Team', (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
};

//Creating a new team
const createATeam = (data) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO Team (name) VALUES (?)', [data.name], function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

const getATeamById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Team WHERE id = ?', [id], (error, row) => {
      if (error) {
        reject(error);
      } else if (!row) {
        resolve(null); // if there is no team with the given id
      } else {
        resolve(row);
      }
    });
  });
};

// Updating a team
const updateATeam = (id, data) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE Team SET name = ? WHERE id = ?',
      [data.name, id],
      function (error) {
        if (error) {
          reject(error);
        } else if (this.changes === 0) {
          resolve(null); //if there was no team found
        } else {
          resolve(id);
        }
      }
    );
  });
};

// Delete a team
const deleteATeam = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Team WHERE id = ?', [id], function (error) {
      if (error) {
        reject(error);
      } else if (this.changes === 0) {
        resolve(null); // if a team not found
      } else {
        resolve(id);
      }
    });
  });
};

module.exports = {
  createATeam,
  getAllExistingTeams,
  getATeamById,
  updateATeam,
  deleteATeam,
};
