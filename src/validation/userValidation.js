const Joi = require('joi');

const userSignupSchema = Joi.object({
    name: Joi.string().min(1).required().messages({
        'string.empty': 'Name is required.',
        'any.required': 'Name is required.'
    }),
    username: Joi.string().optional(),
    email: Joi.string().email().required().messages({
        'string.email': 'Must be a valid email address.',
        'any.required': 'Email address is required.'
    }),
    phoneNumber: Joi.string().pattern(/^[0-9]+$/).required().messages({
        'string.pattern.base': 'Must be a valid phone number.',
        'any.required': 'Phone number is required.'
    }),
    password: Joi.string().min(8).required().pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>])/).messages({
        'string.min': 'Password must be at least 6 characters long.',
        'string.pattern.base': 'Password must contain at least one special character.',
        'any.required': 'Password is required.'
    }),
    birth_date: Joi.date().iso().optional().messages({
        'date.base': 'Must be a valid date.'
    }),
});

const userLoginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Must be a valid email address.',
        'any.required': 'Email address is required.'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long.',
        'any.required': 'Password is required.'
    }),
});

module.exports = {
    userSignupSchema,
    userLoginSchema,
};