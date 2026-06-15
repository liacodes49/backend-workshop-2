const user = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, mobileNumber, role } = req.body;

        const alreadyUser = await user.findOne({ email, mobileNumber });

        if (alreadyUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hpass = await bcrypt.hash(password, 10);

        const newUser = await user.create({
            name,
            email,
            password: hpass,
            mobileNumber,
            role,
        });

        return res.status(201).json({
            message: "User created",
            data: newUser,
        });

    } catch (err) {
        console.error(err.message);

        return res.status(500).json({
            message: "Server error",
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await user.find();

        return res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Server error",
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userData = await user.findById(req.params.id);

        if (!userData) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "User fetched successfully",
            data: userData,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Server error",
        });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await user.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            message: "Server error",
        });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await user.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Server error",
        });
    }
};


