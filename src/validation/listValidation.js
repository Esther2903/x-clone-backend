const Joi = require('joi');

const createListSchema = Joi.object({
    userId: Joi.string().uuid().required().messages({
        'string.empty': 'User ID is required.',
        'string.uuid': 'User ID must be a valid UUID.'
    }),
    name: Joi.string().min(1).required().messages({
        'string.empty': 'List name is required.',
        'string.min': 'List name must be at least 1 character long.'
    }),
    description: Joi.string().optional().allow(''), 
});

const updateListSchema = Joi.object({
    name: Joi.string().min(1).optional().messages({
        'string.min': 'List name must be at least 1 character long.'
    }),
    description: Joi.string().optional().allow(''), 
});

const addUserToListSchema = Joi.object({
    listId: Joi.string().uuid().required().messages({
        'string.empty': 'List ID is required.',
        'string.uuid': 'List ID must be a valid UUID.'
    }),
    userId: Joi.string().uuid().required().messages({
        'string.empty': 'User ID is required.',
        'string.uuid': 'User ID must be a valid UUID.'
    }),
});

module.exports = {
    createListSchema,
    updateListSchema,
    addUserToListSchema,
};