const { Retweet , Tweet } = require('../../utils/index');

class RetweetService {
        async createRetweet(userId, tweetId) {
            const tweet = await Tweet.findByPk(tweetId);
            if (!tweet) {
                throw new Error('Tweet not found');
            }

            const retweet = await Retweet.create({ userId, tweetId });
            return retweet;
        }

        async getRetweetsByTweetId(tweetId) {
            return await Retweet.findAll({
                where: { 
                    tweetId 
                }
            });
        }

        
}

module.exports = new RetweetService();