const membersModel = require('../models/membersModel');

// Getting all members
const getAllMembers = async (request, response) => {
  try {
    const members = await membersModel.getAllMembers();
    response.json(members);
  } catch (error) {
    response.status(500).json({ error: 'Problem in getting the members' });
  }
};

// Creating a new member
const createAMember = async (response, request) => {
  try {
    const data = request.body;
    const memberId = await membersModel.createAMember(data);
    response.json({ id: memberId });
  } catch (error) {
    response.status(500).json({ error: 'Problem in creating a new member' });
  }
};

// Get a member by given id
const getAMemberById = async (request, response) => {
  try {
    const id = request.params.id;
    const member = await membersModel.getMemberById(id);
    if (!member) {
      response.status(404).json({ error: 'Member is not found' });
    } else {
      response.json(member);
    }
  } catch (error) {
    response.status(500).json({ error: 'Problem in getting the member' });
  }
};

// Updating a member
const updateAMember = async (request, response) => {
  try {
    const id = request.params.id;
    const updatedData = request.body;
    const updatedMemberId = await membersModel.updateAMember(id, updatedData);
    if (!updatedMemberId) {
      response.status(404).json({ error: 'Member is not found' });
    } else {
      response.json({ id: updatedMemberId });
    }
  } catch (error) {
    res.status(500).json({ error: 'Problem in updating the member' });
  }
};

// Deleting a member
const deleteMember = async (request, response) => {
  try {
    const id = request.params.id;
    const deletedMemberId = await membersModel.deleteAMember(id);
    if (!deletedMemberId) {
      response.status(404).json({ error: 'Member is not found' });
    } else {
      response.json({ id: deletedMemberId });
    }
  } catch (error) {
    response.status(500).json({ error: 'Problem in deleting the member' });
  }
};

module.exports = {
  createAMember,
  getAMemberById,
  getAllMembers,
  updateAMember,
  deleteMember,
};
