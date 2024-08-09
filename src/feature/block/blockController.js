const BlockService = require('./blockService');

class BlockController {
    async blockUser(req, res) {
        try {
            if (!req.user || !req.user.id) {
                return res.status(401).json({ message: 'User not authenticated' });
            }

            const { blockedUserId } = req.body;
            const blockerUserId = req.user.id; 
            const block = await BlockService.blockUser(blockerUserId, blockedUserId);
            return res.status(201).json(block);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getBlockedUsers(req, res) {
        try {
            if (!req.user || !req.user.id) {
                return res.status(401).json({ message: 'User not authenticated' });
            }

            const userId = req.user.id; 
            const blocks = await BlockService.getBlockedUsers(userId);
            return res.status(200).json(blocks);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new BlockController();