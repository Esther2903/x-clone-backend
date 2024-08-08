const {Tweet, Media} = require('../../utils/index');
const mediaService = require('../medias/mediaService');


class TweetService {

    async createTweet({content, mediaUrl, isThread, parentTweetId, typeTweets, userId}) {

        let tweet = await Tweet.create({ content, isThread, parentTweetId, typeTweets, userId });
        if(mediaUrl){
            const media = await mediaService.addMedia({
                mediaType: this.#determineMediaType(mediaUrl),
                mediaUrl,
                tweetId: tweet.id
            });
            tweet = await this.updateTweet(tweet.id, {content, mediaUrl: media.mediaUrl, isThread, parentTweetId, typeTweets, userId})
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
    

    async getTweetById(tweetId) {
        const tweet = await Tweet.findByPk(tweetId, {
            include: [Media],
        });
        if (!tweet) {
            throw new Error('Tweet not found');
        }
        return tweet;
    }
    async updateTweet(tweetId, {content, mediaUrl, isThread, parentTweetId, typeTweets, userId}) {
        const tweet = await this.findTweetById(tweetId);
        if (tweet.userId !== userId) {
            throw new Error('Unauthorized');
        }
        await tweet.update({content, mediaUrl, isThread, parentTweetId, typeTweets, userId});
        return tweet;
    }

    async deleteTweet(tweetId, userId) {
        const tweet = await this.findTweetById(tweetId);
        if (tweet.userId !== userId) {
            throw new Error('Unauthorized');
        }
        await tweet.destroy();
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
}

module.exports = new TweetService();
