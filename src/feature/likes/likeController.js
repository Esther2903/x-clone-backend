const likeService = require('./likeService'); 

class LikeController {
    async likeTweet(req, res) {
        try {
            const { tweetId } = req.params;
            const userId = req.user.id;
            const like = await likeService.likeTweet(userId, tweetId);
            return res.status(201).json(like);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async unlikeTweet(req, res) {
        try {
            const { tweetId } = req.params;
            const userId = req.user.id; 
            await likeService.unlikeTweet(userId, tweetId);
            return res.status(204).send();
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }

    async getLikesForTweet(req, res) {
        try {
            const { tweetId } = req.params;
            const likes = await likeService.getLikesForTweet(tweetId);
            return res.status(200).json(likes);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new LikeController();
