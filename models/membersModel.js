const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./db/teams_members.db');
// Get all members
const getAllMembers = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM Member', (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
};

// Creating a new member
const createAMember = (data) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO Member (name, teamId) VALUES (?, ?)',
      [data.name, data.teamId],
      function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

// Getting a member by id
const getAMemberById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Member WHERE id = ?', [id], (error, row) => {
      if (error) {
        reject(error);
      } else if (!row) {
        resolve(null); // if Member with given id is not found
      } else {
        resolve(row);
      }
    });
  });
};

// Updating a member with id and updated data
const updateAMember = (id, data) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE Member SET name = ?, teamId = ? WHERE id = ?',
      [data.name, data.teamId, id],
      function (error) {
        if (error) {
          reject(error);
        } else if (this.changes === 0) {
          resolve(null); // if member is not found
        } else {
          resolve(id);
        }
      }
    );
  });
};

// Deleting a member
const deleteAMember = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Member WHERE id = ?', [id], function (error) {
      if (error) {
        reject(error);
      } else if (this.changes === 0) {
        resolve(null); // if Member is not found
      } else {
        resolve(id);
      }
    });
  });
};

module.exports = {
  createAMember,
  getAllMembers,
  getAMemberById,
  updateAMember,
  deleteAMember,
};
