const RetweetService = require('./retweetService');
const NotificationController = require('../notifications/notificationController');

class RetweetController {
    async createRetweet(req, res) {
        try {
            const { tweetId } = req.body; 
            const userId = req.user.id;
            const retweet = await RetweetService.createRetweet(userId, tweetId);
            return res.status(201).json(retweet);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getRetweets(req, res) {
        try {
            const { id } = req.params; 
            const retweet = await RetweetService.getRetweetById(id);
            return res.status(200).json(retweet);
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
