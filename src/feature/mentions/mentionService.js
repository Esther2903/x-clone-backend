const { Mention, Tweet } = require('../../utils/index');

class MentionService {
    async createMention(tweetId, mentionedUserId) {
        const tweet = await Tweet.findByPk(tweetId);
        if (!tweet) {
            throw new Error('Tweet not found');
        }

        const mention = await Mention.create({ tweetId, mentionedUserId });
        return mention;
    }

    async getMentionsByTweetId(tweetId) {
        const mentions = await Mention.findAll({ where: { tweetId } });
        return mentions;
    }

    async getMentionsByUserId(userId) {
        const mentions = await Mention.findAll({ where: { mentionedUserId: userId } });
        return mentions;
    }
}

module.exports = new MentionService();