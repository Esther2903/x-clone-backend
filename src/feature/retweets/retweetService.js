const { Retweet, Tweet } = require('../../utils/index');

class RetweetService {
    async createRetweet(userId, tweetId) {
        const tweet = await Tweet.findByPk(tweetId);
        if (!tweet) {
            throw new Error('Tweet not found');
        }
     
        const retweet = await Retweet.create({ userId, tweetId });
        return retweet;
    }

    async getRetweetById(retweetId) {
        const retweet = await Retweet.findByPk(retweetId);
        if (!retweet) {
            throw new Error('Retweet not found');
        }
        return retweet;
    }

    async deleteRetweet(retweetId, userId) {
        const retweet = await Retweet.findByPk(retweetId);
        if (!retweet) {
            throw new Error('Retweet not found');
        }

        if (retweet.userId !== userId) {
            throw new Error('Unauthorized to delete this retweet');
        }
        await retweet.destroy();
        return retweet;
    }  
}

module.exports = new RetweetService();