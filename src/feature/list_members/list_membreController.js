const ListMemberService = require('./list_membreService');

class ListMemberController {
    async addUserToList(req, res) {
        try {
            const { listId, userId } = req.body;
            const newMember = await ListMemberService.addUserToList(listId, userId);
            res.status(201).json(newMember);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getMembersByList(req, res) {
        try {
            const listId = req.params.id;
            const members = await ListMemberService.getMembersByListId(listId);
            res.json(members);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async removeUserFromList(req, res) {
        try {
            const listId = req.params.id;
            const userId = req.body.userId;
            const result = await ListMemberService.removeUserFromList(listId, userId);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ListMemberController();
