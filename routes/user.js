const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

const { createUserValidator } = require("../validators/user");
const validateInput = require("../validators/validateInput");
const verifyToken = require("../middlewares/auth");

// Create User
router.post(
    "/create",
    createUserValidator,
    validateInput,
    userController.createUser
);

// Login
router.post(
    "/login",
    userController.login
);

// Get All Users
router.get(
    "/all",
    verifyToken,
    userController.getUsers
);

// Get User By ID
router.get(
    "/:id",
    userController.getUserById
);

// Update User
router.put(
    "/update/:id",
    verifyToken,
    userController.updateUser
);

// Delete User
router.delete(
    "/delete/:id",
    userController.deleteUser
);

module.exports = router;
