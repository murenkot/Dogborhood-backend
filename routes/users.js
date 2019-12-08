const express = require('express');
const router = express.Router();
const ctrl = require('../controllers')

//PATH = /api/v1/users

// GET all users
router.get('/', ctrl.users.showAllUsers);

//GET Profile by ID
router.get('/byId/:id', ctrl.users.showById);

// GET User by distance
router.get('/nearby', ctrl.users.findNearby);

//PUT Update Profile
router.put('/update/:id', ctrl.users.update);

// DELETE User account
router.delete('/:id', ctrl.users.deleteUser);


module.exports = router;
