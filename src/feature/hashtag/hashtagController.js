const hashtagService = require('./hashtagService');

class HashtagController {

    async addHashtags(req, res) {
        try {
            let { hashtags } = req.body;
            const  tweetId  = req.params.id;

            if (typeof hashtags === 'string') {
                hashtags = [hashtags.trim()];
            }

            if (!Array.isArray(hashtags)) {
                return res.status(400).json({ message: 'Hashtags should be an array' });
            }

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
