const express = require('express');
const router = express.Router();
const membersController = require('../controllers/membersController');

// Creating a new member
router.post('/', membersController.createAMember);

// Getting all the members
router.get('/', membersController.getAllMembers);

// Getting a member by id
router.get('/:id', membersController.getAMemberById);

// Updating the member by id
router.put('/:id', membersController.updateAMember);

// Deleting a member
router.delete('/:id', membersController.deleteAMember);

module.exports = router;
