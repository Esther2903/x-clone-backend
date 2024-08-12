const { SpaceParticipant , Space , User } = require('../../utils/index');

class SpaceParticipantService {
            async addParticipant(spaceId , userId){
                const spaceExists = await Space.findByPk(spaceId);

                if(!spaceExists){
                    throw new Error('Space not found');
                }

                const userExists = await User.findByPk(userId);
                 if (!userExists) {
                     throw new Error('User not found');
                           }reset-password
               const participant = await SpaceParticipant.create({ spaceId, userId });
                    return participant;
            }

            async getParticipants(spaceId){
                return await SpaceParticipant.findAll({ where: { spaceId } });
            }
}

module.exports = new SpaceParticipantService()