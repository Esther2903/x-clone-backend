
const {List, ListMember} = require('../../utils/index');

class ListService {
    async createList(userId, listData) {
        try {
            const list = await List.create({
                userId,
                name: listData.name,
                description: listData.description 
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

    async addUserToList(listId, userId) {
        try {
            const list = await List.findByPk(ListId);
            if (!list) {
                throw new Error('List not found');
            }

            const existingMember = await ListMember.findOne({
                where : {
                    listId,
                    userId
                }
            });

            if (existingMember) {
                throw new Error('User already a member of the list');
            }

            const newMember = await ListMember.create({
                listId,
                userId
            });

            return newMember;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ListService();
