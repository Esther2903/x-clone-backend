const RetweetService = require('./retweetService');
const NotificationController = require('../notifications/notificationController');

class RetweetController {
    async createRetweet(req, res) {
        console.log('Request user:', req.user);
        try {
            const { tweetId } = req.body;
            const userId = req.user.id;
            const retweet = await RetweetService.createRetweet(userId, tweetId);
            await NotificationController.createRetweetNotification(retweet.id, tweetId);

            return res.status(201).json(retweet);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

        async getRetweets(req, res) {
            try {
                const { tweetId } = req.params;
                const retweets = await RetweetService.getRetweetsByTweetId(tweetId);
                return res.status(200).json(retweets);
            } catch (error) {
                return res.status(500).json({ message: error.message });
            }
        }

        async deleteRetweet(req , res){
            try {
                const { retweetId } =  req.params;
                const userId = req.user.id;
                
                const retweet = await RetweetService.deleteRetweet(retweetId , userId);
                return res.status(200).json(retweet);
            } catch (error) {
                return res.status(500).json({ message: error.message });
            }
        }
}
  

module.exports = new RetweetController();   
