const db = require('../db/teams_members.db');

// Get all existing teams
const getAllExistingTeams = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM Team', (error) => {
      if (error) {
        reject(err);
      } else {
        resolve(error);
      }
    });
  });
};

//Creating a new team
const createATeam = (id, data) => {
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
    db.get('SELECT * FROM Team WHERE id = ?', [id], (error) => {
      if (error) {
        reject(error);
      } else if (!error) {
        resolve(null); //if there is no team with the give id
      } else {
        resolve(error);
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
