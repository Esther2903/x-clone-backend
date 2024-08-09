const { Hashtag, TweetHashtag, Tweet, User } = require('../../utils/index');

class HashtagService {

    async addHashtagsToTweet(tweetId, hashtags) {
        for (const tagName of hashtags) {
            let [hashtag, created] = await Hashtag.findOrCreate({
                where: { name: tagName }
            });

            await TweetHashtag.create({
                tweetId,
                hashtagId: hashtag.id
            });
        }
    }

    async getTweetsByHashtag(hashtagName) {
        const hashtag = await Hashtag.findOne({
            where: { name: hashtagName },
            include: {
                model: Tweet,
                include: [{ model: User, attributes: ['id', 'username'] }]
            }
        });

        if (!hashtag) {
            throw new Error('Hashtag not found');
        }

        return hashtag.Tweets;
    }
}

module.exports = new HashtagService();
