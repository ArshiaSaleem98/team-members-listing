const teamsModel = require('../models/teamsModel');
const membersModel = require('../models/membersModel');

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
    console.log('request', request.body);
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

//Get all members of team

const getMembersByTeamId = async (request, response) => {
  try {
    const id = Number(request.params.id);
    const members = await teamsModel.getMembersByTeamId(id);
    if (!members) {
      response.status(404).json({ error: 'No Member was found' });
    } else {
      response.json(members);
    }
  } catch (error) {
    response.status(500).json({ error: 'Problem in getting the members' });
  }
};

// Updating a team
const updateATeam = async (request, response) => {
  try {
    const id = request.params.id;
    const updatedData = request.body;
    console.log('request', request);
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
    const team = await teamsModel.getATeamById(id);
    if (!team) {
      response.status(404).json({ error: 'Team is not found' });
      return;
    }

    // Delete the team
    const deletedTeamId = await teamsModel.deleteATeam(id);

    if (!deletedTeamId) {
      response.status(404).json({ error: 'Team is not found' });
      return;
    }

    await membersModel.deleteMembersByTeamId(id);

    response.json({ id: deletedTeamId });
  } catch (error) {
    response.status(500).json({ error: 'Problem in deleting the team' });
  }
};

module.exports = {
  createATeam,
  getAllTeams,
  getATeamById,
  updateATeam,
  deleteATeam,
  getMembersByTeamId,
};
