const MuteService = require('./muteService');

class MuteController {
    async muteUser(req, res) {
        try {
           
            const { mutedUserId } = req.body; 
            
            if (!mutedUserId) {
                return res.status(400).json({ message: 'Muted User ID is required' });
            }
            
            if (!req.user || !req.user.id) {
                return res.status(401).json({ message: 'User not authenticated' });
            }
            
            const muterUserId = req.user.id; 
            
            const mute = await MuteService.muteUser(muterUserId, mutedUserId);
            return res.status(201).json(mute);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getMutedUsers(req, res) {
        try {
          
            const userId = req.user.id; 
            const mutes = await MuteService.getMutedUsers(userId);
            return res.status(200).json(mutes);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new MuteController();