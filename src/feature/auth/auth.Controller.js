const authService = require('../auth/auth.Service');


class AuthController {
    async createAuth (req , res) {
        try {
            const userId = req.params.userId;
            const auth = await authService.createAuth(userId);
            res.status(201).json(auth);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllAuths(req, res) {
        try {
            const auths = await authService.getAllAuths();
            res.json(auths);  // Return all auth records
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAuth(req , res) {
        try {
            const userId = req.params.userId;
            console.log('Fetching auth', userId);
            const auth = await authService.getAuthByUserId(userId);
            if(!auth)
               return res.status(404).json({message: 'Auth record not found'});
               res.json(auth); 
        } catch (error) {
            console.error('Fetching', error);
            res.status(500).json({error: error.message});
        }
    }

    async updateAccountStatus(req, res) {
        try {
            const userId = req.params.userId;
            const {status} = req.body;
                if (typeof status !== 'boolean') { 
                        return res.status(400).json({error: 'Status must be boolean'});
                    }

            const auth = await authService.updateAccountStatus(userId, status); 
            res.json(auth); 

        } catch (error) {
             res.status(400).json({ error: error.message });
        }
    }

    async deleteAuth(req, res) {
        try {
            const userId = req.params.userId;
            await authService.deleteAuth(userId);
            res.status(204).send(); 
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();