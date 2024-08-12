const { Mute, User } = require('../../utils/index'); 

class MuteService {
    async muteUser(muterUserId, mutedUserId) {

        const userExists = await User.findByPk(mutedUserId);
        if (!userExists) {
            throw new Error('User to mute not found');
        }

        const mute = await Mute.create({ muterUserId, mutedUserId });
        return mute;
    }

    async getMutedUsers(userId) {
        const mutes = await Mute.findAll({ where: { muterUserId: userId } }); 
        return mutes;
    }
}

module.exports = new MuteService();