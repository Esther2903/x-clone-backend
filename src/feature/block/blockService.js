const {Block , User } = require('../../utils/index');

class BlockService{
        async blockUser(blockerUser , blockerUsedId){
            const userExists = await User.findByPk(blockedUsedId);
        
            if (!userExists){
                throw new Error('User does not exist');
            }
            const block = await Block.create({ blockerUserId, blockedUserId });
            return block;
        }
    
        async getBlockedUsers(userId) {
            return await Block.findAll({ where: { blockerUserId: userId } });
        }
}

module.exports = new BlockService();