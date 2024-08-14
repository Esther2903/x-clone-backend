const Joi = require('joi');

const createCommunitySchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.empty': 'Name is required.',
        'string.min': 'Name must be at least 3 characters long.'
    }),
    description: Joi.string().optional().allow(''),
});

const addMemberSchema = Joi.object({
    communityId: Joi.string().uuid().required().messages({
        'string.empty': 'Community ID is required.',
        'string.uuid': 'Community ID must be a valid UUID.'
    }),
    memberUserId: Joi.string().uuid().required().messages({
        'string.empty': 'Member User ID is required.',
        'string.uuid': 'Member User ID must be a valid UUID.'
    }),
});

const updateCommunitySchema = Joi.object({
    name: Joi.string().min(3).optional().messages({
        'string.min': 'Name must be at least 3 characters long.'
    }),
    description: Joi.string().optional().allow(''),
});

module.exports = {
    createCommunitySchema,
    addMemberSchema,
    updateCommunitySchema,
};