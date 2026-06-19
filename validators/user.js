const { body } = require('express-validator');

const createUserValidator = [
    body('email').isEmail().withMessage('Please provide a valid email')
        .notEmpty().withMessage('Email is required'),

    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .notEmpty().withMessage('Password is required'),

    body('name').notEmpty().withMessage('Name is required'),

    body('mobileNumber').notEmpty().withMessage('Mobile number is required')
        .notEmpty().withMessage('Mobile number is required'),

    body('roleId').notEmpty().withMessage('Role ID is required')
        .isMongoId().withMessage('Please provide a valid role ID'),
];

module.exports = {
    createUserValidator,
}