const Joi = require('joi');

const addMediaSchema = Joi.object({
    mediaType: Joi.string().valid('image', 'video', 'gif').required().messages({
        'string.empty': 'Media type is required.',
        'any.only': 'Media type must be one of the following: image, video, gif.'
    }),
    mediaUrl: Joi.string().uri().required().messages({
        'string.empty': 'Media URL is required.',
        'string.uri': 'Media URL must be a valid URI.'
    }),
    tweetId: Joi.string().uuid().required().messages({
        'string.empty': 'Tweet ID is required.',
        'string.uuid': 'Tweet ID must be a valid UUID.'
    }),
});

module.exports = {
    addMediaSchema,
};