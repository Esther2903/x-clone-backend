const {Community, CommunityMember, User} = require('../../utils/index'); 

class CommunityService {
    async createCommunity(userId, name, description) {
        const community = await Community.create({userId, name, description});
        return community;
    }

    async addMember(communityId, memberUserId) {
        const community = await Community.findByPk(communityId);
        if (!community) {
            throw new Error('Community not found');
        }

        const communityMember = await CommunityMember.create({ communityId, memberUserId});
        return communityMember;
    }

    async getCommunities() {
        return await Community.findAll();
    }

    async getCommunityMembers(communityId) {
        return await CommunityMember.findAll({
            where: { communityId },
            include: [{ model: User, attributes: ['id', 'username'] }] 
        });
    }

    async removeMember(communityId, memberUserId, userId) {
        const community = await Community.findOne({ where: { id: communityId, userId } });
        if (!community) {
            throw new Error('Community not found or user is not the creator');
        }

        await CommunityMember.destroy({
            where: {
                communityId,
                memberUserId,
            },
        });

        return { message: 'Member removed successfully' };
    }

    async updateCommunity(communityId, userId, updateData) {
        const community = await Community.findOne({ where: { id: communityId, userId } });
        if (!community) {
            throw new Error('Community not found or user is not the creator');
        }

        await community.update(updateData);
        return community;
    }
}

module.exports = new CommunityService();
