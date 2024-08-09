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
            console.log('Request to get muted users received'); // Log de la requête
            const userId = req.user.id; 
            console.log('User ID fetching muted users:', userId); // Log de l'ID de l'utilisateur
            const mutes = await MuteService.getMutedUsers(userId);
            console.log('Muted users found:', mutes); // Log des utilisateurs mis en sourdine
            return res.status(200).json(mutes);
        } catch (error) {
            console.error('Error fetching muted users:', error.message); // Log d'erreur
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new MuteController();