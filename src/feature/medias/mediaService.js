const { Media, Tweet } = require('../../utils/index');
const { addMediaSchema } = require('../../validation/mediaValidation');

class MediaService {
    
    async addMedia({ mediaType, mediaUrl, tweetId }) {
        const { error } = addMediaSchema.validate({ mediaType, mediaUrl, tweetId });
        if (error) {
            throw new Error(error.details[0].message);
        }

        const media = await Media.create({ mediaType, mediaUrl, tweetId });
        return media;
    }

    async getMediaById(mediaId) {
        const media = await Media.findByPk(mediaId);
        if (!media) {
            throw new Error('Media not found');
        }
        return media;
    }

    async deleteMedia(mediaId) {
        const media = await this.findMediaById(mediaId);
        await media.destroy();
        return media;
    }

    async getAllMediaByTweet(tweetId) {
        return await Media.findAll({
            where: { tweetId }
        });
    }

    async findTweetById(tweetId) {
        const tweet = await Tweet.findByPk(tweetId);
        if (!tweet) {
            throw new Error('Tweet not found');
        }
        return tweet;
    }

    async findMediaById(mediaId) {
        const media = await Media.findByPk(mediaId);
        if (!media) {
            throw new Error('Media not found');
        }
        return media;
    }
}

module.exports = new MediaService();