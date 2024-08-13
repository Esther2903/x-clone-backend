const {Followership  }=  require('../../utils/index'); 

class FollowershipService {
    async followUser(followerId, followedId) {
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
        });
    }

    async unfollowUser(followerId, followedId) {
        const follow = await Followership.findOne({
            where: {
                followerId,
                followedId
            }
        });
        if (!follow) {
            throw new Error('You are not following this user.');
        }
        await follow.destroy();
        return { message: 'Successfully unfollowed the user.' };
    }

    async getFollowers(userId) {
        return await Followership.findAll({
            where: { followedId: userId },
            include: [{ model: UserModel, as: 'follower' }]
        });
    }

    async getFollowing(userId) {
        return await Followership.findAll({
            where: { followerId: userId },
            include: [{ model: UserModel, as: 'followed' }]
        });
    }
}

module.exports = new FollowershipService();