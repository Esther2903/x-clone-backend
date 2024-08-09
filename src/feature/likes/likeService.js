const {Like, Tweet, User} = require('../../utils/index'); 

class LikeService {
    async likeTweet(userId, tweetId) {
        const tweet = await Tweet.findByPk(tweetId);
        if (!tweet) {
            throw new Error('Tweet not found');
        }

        const existingLike = await Like.findOne({
            where: { userId, tweetId }
        });
        if (existingLike) {
            throw new Error('You already liked this tweet');
        }

        const like = await Like.create({ userId, tweetId });
        return like;
    }

    async unlikeTweet(userId, tweetId) {
        const deletedLike = await Like.destroy({
            where: { userId, tweetId }
        });

        if (!deletedLike) {
            throw new Error('Like not found');
        }

        return deletedLike;
    }

    async getLikesForTweet(tweetId) {
        const likes = await Like.findAll({
            where: { tweetId },
            include: [{ model: User, attributes: ['id', 'username'] }]
        });
        return likes;
    }
}

module.exports = new LikeService();
