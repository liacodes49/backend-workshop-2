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
router.get('/:id', userController.getUserById);
router.delete('/delete/:id', userController.deleteUser);
module.exports = router;