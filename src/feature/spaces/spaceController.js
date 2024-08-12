const SpaceService = require('./spaceService');

class SpaceController {
    async createSpace(req, res) {
        try {
            const { title } = req.body; 
            const creatorUserId = req.user.id; 
            
            const space = await SpaceService.createSpace(creatorUserId, title);
            return res.status(201).json(space);
        } catch (error) {
            console.error('Error creating space:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }
    async getSpaces(req, res) {
        try {
            const spaces = await SpaceService.getSpaces();
            return res.status(200).json(spaces);
        } catch (error) {
            console.error('Error fetching spaces:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }

    async getSpaceById(req, res) {
        try {
            const { spaceId } = req.params;
            const space = await SpaceService.getSpaceById(spaceId);
            if (!space) {
                return res.status(404).json({ message: 'Space not found' });
            }
            return res.status(200).json(space);
        } catch (error) {
            console.error('Error fetching space:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new SpaceController();