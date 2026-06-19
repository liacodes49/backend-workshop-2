const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

const { createUserValidator } = require("../validators/user");
const validateInput = require("../validators/validateInput");
const verifyToken = require("../middlewares/auth");


router.post(
    "/create",
    createUserValidator,
    validateInput,
    userController.createUser
);


router.post(
    "/login",
    userController.login
);


router.get(
    "/all",
    verifyToken,
    userController.getAllUsers
);


router.get(
    "/:id",
    userController.getUserById
);


router.put(
    "/update/:id",
    verifyToken,
    userController.updateUser
);


router.delete(
    "/delete/:id",
    userController.deleteUser
);

module.exports = router;