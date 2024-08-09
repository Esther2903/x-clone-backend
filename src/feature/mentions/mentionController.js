const MentionService = require('./mentionService');

class MentionController {
        async createMention(req , res){
            try {
                const { tweetId, mentionedUserId } = req.body;
                const mention = await MentionService.createMention(tweetId, mentionedUserId);
                return res.status(201).json(mention);
            } catch (error) {
                return res.status(500).json({ message: error.message });
            }
        }
}

module.exports = new MentionController();