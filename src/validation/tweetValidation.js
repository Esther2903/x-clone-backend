const Joi = require('joi');

const createTweetSchema = Joi.object({
    content: Joi.string().min(1).required().messages({
        'string.empty': 'Content field is required.',
        'string.min': 'Content must be at least 1 character long.',
        'any.required': 'Content field is required.'
    }),
    mediaUrl: Joi.string().uri().optional().allow(null),
});

const createReplySchema = Joi.object({
    content: Joi.string().min(1).required().messages({
        'string.empty': 'Content field is required.',
        'string.min': 'Content must be at least 1 character long.',
        'any.required': 'Content field is required.'
    }),
    parentTweetId: Joi.string().uuid().required().messages({
        'string.empty': 'Parent Tweet ID is required.',
        'string.uuid': 'Parent Tweet ID must be a valid UUID.'
    }),
    mediaUrl: Joi.string().uri().optional().allow(null),
});

const createQuoteSchema = Joi.object({
    content: Joi.string().min(1).required().messages({
        'string.empty': 'Content field is required.',
        'string.min': 'Content must be at least 1 character long.',
        'any.required': 'Content field is required.'
    }),
    parentTweetId: Joi.string().uuid().required().messages({
        'string.empty': 'Parent Tweet ID is required.',
        'string.uuid': 'Parent Tweet ID must be a valid UUID.'
    }),
    mediaUrl: Joi.string().uri().optional().allow(null), 
});

const updateTweetSchema = Joi.object({
    content: Joi.string().optional().allow(''),
    mediaUrl: Joi.string().uri().optional().allow(null), 
    isThread: Joi.boolean().optional(),
    parentTweetId: Joi.string().uuid().optional(),
    typeTweets: Joi.string().valid('tweet', 'quote', 'reply').optional(),
});

module.exports = {
    createTweetSchema,
    createReplySchema,
    createQuoteSchema,
    updateTweetSchema,
};