const communityService = require('./communityService'); 

const { createCommunitySchema, addMemberSchema, updateCommunitySchema } = require('../../validation/communityValidation');

class CommunityController {
    async createCommunity(req, res) {
        try {
            const { error } = createCommunitySchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details.map(err => err.message) });
            }

            const { name, description } = req.body;
            const userId = req.user.id; 
            const community = await communityService.createCommunity(userId, name, description);
            return res.status(201).json(community);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async addMember(req, res) {
        try {
            const { error } = addMemberSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details.map(err => err.message) });
            }

            const { communityId, memberUserId } = req.body;
            const communityMember = await communityService.addMember(communityId, memberUserId);
            return res.status(201).json(communityMember);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getCommunities(req, res) {
        try {
            const communities = await communityService.getCommunities();
            return res.status(200).json(communities);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getCommunityMembers(req, res) {
        try {
            const { communityId } = req.params;
            const members = await communityService.getCommunityMembers(communityId);
            return res.status(200).json(members);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async removeMember(req, res) {
        try {
            const { communityId, memberUserId } = req.body;
            const response = await communityService.removeMember(communityId, memberUserId, req.user.id);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async updateCommunity(req, res) {
        try {
            // Validate update community data
            const { error } = updateCommunitySchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details.map(err => err.message) });
            }

            const { communityId } = req.params;
            const updateData = req.body; 
            const community = await communityService.updateCommunity(communityId, req.user.id, updateData);
            return res.status(200).json(community);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new CommunityController();
