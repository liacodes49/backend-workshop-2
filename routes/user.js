const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const { createUserValidator } = require('../validators/user');
const validateInput = require('../validators/validateInput');

router.post(
    '/create',
    createUserValidator,
    validateInput,
    userController.createUser
);

router.get('/all', userController.getUsers);

module.exports = router;