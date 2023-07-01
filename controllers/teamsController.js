const teamsModel = require('../models/teamsModel');

// Getting all the teams
const getAllTeams = async (request, response) => {
  try {
    const teams = await teamsModel.getAllExistingTeams();
    response.json(teams);
  } catch (error) {
    response.status(500).json({ error: 'Problem in getting the teams' });
  }
};

// Creating a new team
const createATeam = async (request, response) => {
  try {
    const data = request.body;
    const id = await teamsModel.createATeam(data);
    response.json({ id: id });
  } catch (error) {
    response.status(500).json({ error: 'Problem in creating the team' });
  }
};

// Getting a team by ID
const getATeamById = async (request, response) => {
  try {
    const id = Number(request.params.id);
    const team = await teamsModel.getATeamById(id);
    if (!team) {
      response.status(404).json({ error: 'Team is not found' });
    } else {
      response.json(team);
    }
  } catch (error) {
    response.status(500).json({ error: 'Problem in getting the team' });
  }
};

// Updating a team
const updateATeam = async (request, response) => {
  try {
    const id = request.params.id;
    const updatedData = request.body;
    const updatedTeamId = await teamsModel.updateATeam(id, updatedData);
    if (!updatedTeamId) {
      response.status(404).json({ error: 'Team is not found' });
    } else {
      response.json({ id: updatedTeamId });
    }
  } catch (error) {
    response.status(500).json({ error: 'Problem in updating the team' });
  }
};

// Deleting a team
const deleteATeam = async (request, response) => {
  try {
    const id = request.params.id;
    const deletedTeamId = await teamsModel.deleteATeam(id);
    if (!deletedTeamId) {
      response.status(404).json({ error: 'Team is not found' });
    } else {
      response.json({ id: deletedTeamId });
    }
  } catch (error) {
    res.status(500).json({ error: 'Problem in deleting the team' });
  }
};

module.exports = {
  createATeam,
  getAllTeams,
  getATeamById,
  updateATeam,
  deleteATeam,
};
