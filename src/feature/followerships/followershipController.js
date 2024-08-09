const followershipService = require('./followershipService');


class FollowershipController {
       async follow(req , res){
            try {
              
                const { followerId, followedId } = req.body;
                const follow = await followershipService.followUser(followerId , followedId);

                res.status(201).json(follow);
            } catch (error) {
                res.status(400).json({error: error.message});
            }
       }


       async unfollow(req, res){
        try {
                const { followerId, followedId } = req.body;
                const unfollow = await followershipService.unfollowUser(followerId, followedId);
                res.json(unfollow);
            } catch (error) {
                res.status(400).json({error: error.message});
            }
       }

       async getFollowers(req , res){
        try {
            const userId = req.params.userId;

            const followers = await followershipService.getFollowers(userId);
            res.json(followers);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
   }
       async getFollowing(req , res){
            try {
                const userId = req.params.userId;
                const following = await followershipService.getFollowing(userId);
                res.json(following);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
       }
}

module.exports = new FollowershipController();