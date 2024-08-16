const { where } = require('sequelize');
const { Tweet, Media, User } = require('../../utils/index');
const mediaService = require('../medias/mediaService');
const { createTweetSchema, createReplySchema, createQuoteSchema } = require('../../validation/tweetValidation');

class TweetService {

    async createTweet({ content, mediaUrl, userId }) {
        const { error } = createTweetSchema.validate({ content, mediaUrl });
        if (error) {
            throw new Error(error.details[0].message);
        }

        let tweet = await Tweet.create({ content, typeTweets: 'tweet', userId });

        if (mediaUrl) {
            const media = await mediaService.addMedia({
                mediaType: this.#determineMediaType(mediaUrl),
                mediaUrl,
                tweetId: tweet.id,
            });
            tweet = await this.updateTweet(tweet.id, { content, mediaUrl: media.mediaUrl, userId });
        }

        const comments = await this.getCommentsForTweet(tweet.id);

        return {
            tweet,
            comments,
            commentCount: comments.length
        };
    }

    async createReply({ content, mediaUrl, parentTweetId, userId }) {
        const { error } = createReplySchema.validate({ content, mediaUrl, parentTweetId });
        if (error) {
            throw new Error(error.details[0].message);
        }

        if (!parentTweetId) {
            throw new Error('parentTweetId is required for replies');
        }

        const parentTweet = await Tweet.findByPk(parentTweetId);
        if (!parentTweet) {
            throw new Error('Tweet not found');
        }

        let tweet = await Tweet.create({
            content,
            isThread: true,
            parentTweetId: parentTweet.id,
            typeTweets: 'reply',
            userId
        });

        if (mediaUrl) {
            const media = await mediaService.addMedia({
                mediaType: this.#determineMediaType(mediaUrl),
                mediaUrl,
                tweetId: tweet.id,
            });
            tweet = await this.updateTweet(tweet.id, { content, isThread: true, parentTweetId, typeTweets: 'reply', mediaUrl: media.mediaUrl, userId });
        }

        const comments = await this.getCommentsForTweet(tweet.id);

        return {
            tweet,
            comments,
            commentCount: comments.length
        };
    }

    async createQuote({ content, mediaUrl, parentTweetId, userId }) {
        const { error } = createQuoteSchema.validate({ content, mediaUrl, parentTweetId });
        if (error) {
            throw new Error(error.details[0].message);
        }

        if (!parentTweetId) {
            throw new Error('parentTweetId is required for quotes');
        }

        const parentTweet = await Tweet.findByPk(parentTweetId);
        if (!parentTweet) {
            throw new Error('Tweet not found');
        }

        let tweet = await Tweet.create({
            content,
            parentTweetId: parentTweet.id,
            typeTweets: 'quote',
            userId
        });

        if (mediaUrl) {
            const media = await mediaService.addMedia({
                mediaType: this.#determineMediaType(mediaUrl),
                mediaUrl,
                tweetId: tweet.id,
            });
            tweet = await this.updateTweet(tweet.id, { content, parentTweetId, mediaUrl: media.mediaUrl, typeTweets: 'quote', userId });
        }

        const comments = await this.getCommentsForTweet(tweet.id);

        return {
            tweet,
            comments,
            commentCount: comments.length
        };
    }


    async getCommentsForTweet(tweetId) {
        const comments = await Tweet.findAll({
            where: { parentTweetId: tweetId, typeTweets: 'reply' },
            include: [Media, { model: User, attributes: ['id', 'username'] }]
        });

        return {
            count: comments.length,
            comments
        };
    }

    async updateTweet(tweetId, { content, mediaUrl, isThread, parentTweetId, typeTweets, userId }) {
        const tweet = await this.findTweetById(tweetId);
        if (tweet.userId !== userId) {
            throw new Error('Unauthorized');
        }

        await tweet.update({ content, isThread, parentTweetId, typeTweets });

        if (mediaUrl) {
            const media = await mediaService.addMedia({
                mediaType: this.#determineMediaType(mediaUrl),
                mediaUrl,
                tweetId: tweet.id,
            });
            await tweet.update({ mediaUrl: media.mediaUrl });
        }

        return tweet;
    }

    async deleteTweet(tweetId, userId) {
        const tweet = await this.findTweetById(tweetId);
        if (tweet.userId !== userId) {
            throw new Error('Unauthorized');
        }
        await this.deleteAssociatedMedia(tweetId);
        await tweet.destroy();
        return tweet;
    }

    async getTweetById(tweetId) {
        const tweet = await Tweet.findByPk(tweetId, {
            include: [Media],
        });
        if (!tweet) {
            throw new Error('Tweet not found');
        }
        return tweet;
    }

    async getAllTweets() {
        return await Tweet.findAll({
            include: [Media],
        });
    }

    async findTweetById(tweetId) {
        const tweet = await Tweet.findByPk(tweetId);
        if (!tweet) {
            throw new Error('Tweet not found');
        }
        return tweet;
    }

    #determineMediaType(mediaUrl) {
        const extension = mediaUrl.split('.').pop().toLowerCase();
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const videoExtensions = ['mp4', 'avi', 'mov'];

        if (imageExtensions.includes(extension)) {
            return 'image';
        } else if (videoExtensions.includes(extension)) {
            return 'video';
        } else if (extension === 'gif') {
            return 'gif';
        } else {
            throw new Error('Unsupported media type');
        }
    }

    async deleteAssociatedMedia(tweetId) {
        const media = await Media.findAll({ where: { tweetId } });
        const deletePromises = media.map(mediaItem => mediaService.deleteMedia(mediaItem.id));
        await Promise.all(deletePromises);
    }
}

module.exports = new TweetService();
