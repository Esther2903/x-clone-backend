const { Hashtag, TweetHashtag, Tweet, User } = require('../../utils/index');

class HashtagService {

    async addHashtagsToTweet(tweetId, hashtags) {
        for (const tagName of hashtags) {
            let [hashtag] = await Hashtag.findOrCreate({
                where: { name: tagName }
            });

            await TweetHashtag.create({
                tweetId,
                hashtagId: hashtag.id
            });
        }
    }

    async getTweetsByHashtag(hashtagName) {

        const hashtag = await Hashtag.findOne({ where: { name: hashtagName } });
    
        if (!hashtag) {
            throw new Error('Hashtag not found');
        }
    
        const tweetHashtags = await TweetHashtag.findAll({
            where: { hashtagId: hashtag.id },
            include: {
                model: Tweet,
                include: [{ model: User, attributes: ['id', 'username'] }]
            }
        });
    
        const tweets = tweetHashtags.map(th => th.Tweet);
    
        return tweets;
    }
    
}

module.exports = new HashtagService();
