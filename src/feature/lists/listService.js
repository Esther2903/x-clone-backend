
const List = require('../../utils/index');

class ListService {
    async createList(userId, listData) {
        try {
            const list = await List.create({
                userId,
                ...listData
            });
            return list;
        } catch (error) {
            throw error;
        }
    }

    async getListById(listId) {
        try {
            const list = await List.findByPk(listId);
            if (!list) {
                throw new Error('List not found');
            }
            return list;
        } catch (error) {
            throw error;
        }
    }

    async getUserLists(userId) {
        try {
            const lists = await List.findAll({
                where: { userId }
            });
            return lists;
        } catch (error) {
            throw error;
        }
    }

    async updateList(listId, updatedData) {
        try {
            const list = await List.findByPk(listId);
            if (!list) {
                throw new Error('List not found');
            }
            await list.update(updatedData);
            return list;
        } catch (error) {
            throw error;
        }
    }

    async deleteList(listId) {
        try {
            const list = await List.findByPk(listId);
            if (!list) {
                throw new Error('List not found');
            }
            await list.destroy();
            return { message: 'List deleted successfully' };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ListService();
