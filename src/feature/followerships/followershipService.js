const Followership = require('./followershipModel');


class FollowershipService {

    async followUser(followerId, followedId) 
    {
       const existing = await Followership.findOne({
        where: {
            followerId,
            followedId
        }
       });
       if (existing) {
        throw new Error('Already following this user');
    }
    return await Followership.create({
        followerId,
        followedId
    })
}
}

module.exports = new FollowershipService();