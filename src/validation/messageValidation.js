const Joi = require('joi');

const sendMessageSchema = Joi.object({
    receiverId: Joi.string().uuid().required().messages({
        'string.empty': 'Receiver ID is required.',
        'string.uuid': 'Receiver ID must be a valid UUID.'
    }),
    content: Joi.string().min(1).required().messages({
        'string.empty': 'Content field is required.',
        'any.required': 'Content field is required.'
    }),
    picture: Joi.string().optional().allow(''), 
});

const updateMessageSchema = Joi.object({
    content: Joi.string().optional().allow(''),
    picture: Joi.string().optional().allow(''),
});

module.exports = {
    sendMessageSchema,
    updateMessageSchema,
};