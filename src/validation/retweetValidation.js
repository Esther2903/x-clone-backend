const Joi = require('joi');

const createRetweetSchema = Joi.object({
    tweetId: Joi.string().uuid().required().messages({
        'string.empty': 'Tweet ID is required.',
        'string.uuid': 'Tweet ID must be a valid UUID.'
    }),
});

module.exports = {
    createRetweetSchema,
};