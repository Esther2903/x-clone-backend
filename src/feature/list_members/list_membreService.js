const { ListMember, List, User } = require('../../utils/index');

class ListMemberService {
    async addUserToList(listId, userId) {
        try {
            const list = await List.findByPk(listId);
            if (!list) {
                throw new Error('List not found');
            }

            const existingMember = await ListMember.findOne({
                where: {
                    listId,
                    memberUserId: userId
                }
            });

            if (existingMember) {
                throw new Error('User already a member of the list');
            }

            const newMember = await ListMember.create({
                listId,
                memberUserId: userId
            });

            return newMember;
        } catch (error) {
            throw error;
        }
    }

    async getMembersByListId(listId) {
        try {
            const members = await ListMember.findAll({
                where: { listId }
            });
            return members;
        } catch (error) {
            throw error;
        }
    }

    async removeUserFromList(listId, userId) {
        try {
            const member = await ListMember.findOne({
                where: {
                    listId,
                    memberUserId: userId
                }
            });

            if (!member) {
                throw new Error('Member not found in the list');
            }

            await member.destroy();
            return { message: 'Member removed successfully' };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ListMemberService();
