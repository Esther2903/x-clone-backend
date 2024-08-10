const { Space , User } = require('../../utils/index');

class SpaceService {
    async createSpace(creatorUserId, title) {
    
        const userExists = await User.findByPk(creatorUserId);
        if (!userExists) {
            throw new Error('Creator user not found');
        }

    
        const space = await Space.create({ title, creatorUserId });
        return space;
    }

    async getSpaces() {
        return await Space.findAll();
    }

    async getSpaceById(spaceId) {
  
        return await Space.findByPk(spaceId);
    }
}


module.exports = new SpaceService();