const listService = require('./listService');

class ListController {
    async createList(req, res) {
        try {
            const { userId, name, description } = req.body;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }
            if (!name) {
                return res.status(400).json({ error: 'List name is required' });
            }
            const listData = { name, description };
            const list = await listService.createList(userId, listData);
            res.status(201).json(list);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    

    async getList(req, res) {
        try {
            const listId = req.params.id;
            const list = await listService.getListById(listId);
            res.json(list);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getUserLists(req, res) {
        try {
            const userId = req.user.id; 
            const lists = await listService.getUserLists(userId);
            res.json(lists);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
    
    

    async updateList(req, res) {
        try {
            const listId = req.params.id;
            const updatedData = req.body;
            const updatedList = await listService.updateList(listId, updatedData);
            res.json(updatedList);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteList(req, res) {
        try {
            const listId = req.params.id;
            const result = await listService.deleteList(listId);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async addUserToList(req, res) {
        try {
            const { listId, userId } = req.body;
            const newMember = await listService.addUserToList(listId, userId);
            res.status(201).json(newMember);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ListController();