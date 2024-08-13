const tweetService = require('./tweetService');

class TweetController {

    async createTweet(req, res) {
        try {
            const tweetData = { 
                content: req.body.content, 
                mediaUrl: req.file ? req.file.path : null,
                userId: req.user.id
            };
            const tweet = await tweetService.createTweet(tweetData);
            return res.status(201).json(tweet);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: error.message });
        }
    }

    async createReply(req, res) {
        try {
            const tweetData = { 
                content: req.body.content, 
                mediaUrl: req.file ? req.file.path : null,
                parentTweetId: req.body.parentTweetId,
                userId: req.user.id
            };
            const tweet = await tweetService.createReply(tweetData);
            
            return res.status(201).json(tweet);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: error.message });
        }
    }

    async createQuote(req, res) {
        try {
            const tweetData = { 
                content: req.body.content, 
                mediaUrl: req.file ? req.file.path : null,
                parentTweetId: req.body.parentTweetId,
                userId: req.user.id
            };
            const tweet = await tweetService.createQuote(tweetData);
            
            return res.status(201).json(tweet);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: error.message });
        }
    }

    async getCommentsForTweet(req, res) {
        try {
            const tweetId = req.params.id;
            const comments = await tweetService.getCommentsForTweet(tweetId);
            return res.status(200).json(comments);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getTweetById(req, res) {
        try {
            const tweet = await tweetService.getTweetById(req.params.id);
            return res.status(200).json(tweet);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }

    async updateTweet(req, res) {
        try {
            const tweetData = { 
                content: req.body.content, 
                mediaUrl: req.file ? req.file.path : '', 
                isThread: req.body.isThread,
                parentTweetId: req.body.parentTweetId,
                typeTweets: req.body.typeTweets,
                userId: req.user.id
            };
            const tweet = await tweetService.updateTweet(req.params.id, tweetData);
            return res.status(200).json(tweet);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteTweet(req, res) {
        try {
            await tweetService.deleteTweet(req.params.id, req.user.id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAllTweets(req, res) {
        try {
            const tweets = await tweetService.getAllTweets();
            return res.status(200).json(tweets);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}

module.exports = new TweetController();
