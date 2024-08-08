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

    async getAuth(req , res) {
        try {
            const userId = req.params.userId;
            const auth = await authService.getAuthByUserId(userId);
            if(!auth)
               return res.status(404).json({message: 'Auth recordnot found'});
               res.json(auth); 
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async updateAccountStatus(req, res) {
        try {
            const userId = req.params.userId;
            const {status} = await authService.updateAccountStatus(userId,status);
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