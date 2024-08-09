const hashtagService = require('./hashtagService');

class HashtagController {

    async addHashtags(req, res) {
        try {
            const tweetId = req.params.id;
            const { hashtags } = req.body;

            await hashtagService.addHashtagsToTweet(tweetId, hashtags);
            return res.status(201).json({ message: 'Hashtags added successfully' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }


    async getTweets(req, res) {
        try {
            const hashtagName = req.params.name;
            const tweets = await hashtagService.getTweetsByHashtag(hashtagName);

            return res.status(200).json(tweets);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new HashtagController();
