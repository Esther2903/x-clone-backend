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
}

module.exports = new FollowershipController();