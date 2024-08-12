const { Tweet, Media, User } = require('../../utils/index');
const mediaService = require('../medias/mediaService');

class TweetService {
    async createTweet({ content, mediaUrl, parentTweetId, typeTweets, userId }) {
        let isThread = false;

        if (typeTweets === 'reply') {
            if (!parentTweetId) {
                throw new Error('parentTweetId is required for replies');
            }
            typeTweets = 'reply';
            isThread = true;
        } else if (typeTweets === 'quote') {
            if (!parentTweetId) {
                throw new Error('parentTweetId is required for quotes');
            }
            typeTweets = 'quote'
        }
        
        let tweet = await Tweet.create({ content, isThread, parentTweetId, typeTweets, userId });
        
        if (mediaUrl) {
            const media = await mediaService.addMedia({
                mediaType: this.#determineMediaType(mediaUrl),
                mediaUrl,
                tweetId: tweet.id,
            });
            tweet = await this.updateTweet(tweet.id, { content, mediaUrl: media.mediaUrl, isThread, parentTweetId, typeTweets, userId });
        }

        const comments = await this.getCommentsForTweet(tweet.id);

        return {
            tweet,
            comments,
            commentCount: comments.length
        };
        
        return tweet;
        
    }

    async getCommentsForTweet(tweetId) {
        const comments = await Tweet.findAll({
            where: { parentTweetId: tweetId, typeTweets: 'reply' },
            include: [{ model: User, attributes: ['id', 'username'] }] 
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
