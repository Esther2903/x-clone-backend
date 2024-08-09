const MentionService = require('./mentionService');

class MentionController {
    async createMention(req, res) {
        try {
            const { tweetId, mentionedUserId } = req.body;
         
            const mention = await MentionService.createMention(tweetId, mentionedUserId);
            return res.status(201).json(mention);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getMentionsByTweet(req, res) {
        try {
            const { tweetId } = req.params;
           
            const mentions = await MentionService.getMentionsByTweetId(tweetId);
            return res.status(200).json(mentions);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getMentionsByUser(req, res) {
        try {
            const userId = req.user.id; 
        
            const mentions = await MentionService.getMentionsByUserId(userId);
            return res.status(200).json(mentions);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new MentionController();