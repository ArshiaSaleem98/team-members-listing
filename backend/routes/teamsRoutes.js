const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teamsController');

// Creating a new team
router.post('/', teamsController.createATeam);

// Getting all the teams
router.get('/', teamsController.getAllTeams);

// Getting a team by id
router.get('/:id', teamsController.getATeamById);

// Getting members of team by id
router.get('/members/:id', teamsController.getMembersByTeamId);

// Updating the team by id
router.put('/:id', teamsController.updateATeam);

// Deleting a team
router.delete('/:id', teamsController.deleteATeam);

module.exports = router;
