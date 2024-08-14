const { Op } = require('sequelize');
const {Message, User} = require('../../utils/index');
const { sendMessageSchema } = require('../../validations/messageValidation');

class MessageService {
    
    async sendMessage({ senderId, receiverId, content, picture }) {
        const { error } = sendMessageSchema.validate({ receiverId, content });
        if (error) {
            throw new Error(error.details[0].message);
        }

        const message = await Message.create({ content, senderId, receiverId, picture });
        return message;
    }
    async updateMessage(messageId, { content, picture, senderId }) {
        const message = await Message.findByPk(messageId);
    
        if (!message) {
            throw new Error('Message not found');
        }
        if (message.senderId !== senderId) {
            throw new Error('Unauthorized to update this message');
        }
    
        await message.update({
            content: content || message.content,
            picture: picture || message.picture,
        });
    
        return message;
    }


    async deleteMessage(messageId, userId) {
        const message = await Message.findByPk(messageId);
    
        if (!message) {
            throw new Error('Message not found');
        }
    
        if (message.senderId !== userId) {
            throw new Error('Unauthorized to delete this message');
        }
    
        await message.destroy();
        return { message: 'Message deleted successfully' };
    }
    
    async getMessageById(messageId, userId) {
        const message = await Message.findByPk(messageId);
    
        if (!message) {
            throw new Error('Message not found');
        }
    
        if (message.senderId !== userId && message.receiverId !== userId) {
            throw new Error('Unauthorized to view this message');
        }
    
        return message;
    }
    
    async getAllMessagesForUser(userId) {
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId },
                    { receiverId: userId }
                ]
            }
        });
    
        return messages;
    }
    
    
    async getMessagesByUserId(userId) {
        const messages = await Message.findAll({
            where: {
                receiverId: userId
            },
            include: [
                { model: User, attributes: ['id', 'username'] }
            ],
            order: [['created_at', 'DESC']]
        });

        return messages;
    }


    async markAsRead(messageId, userId) {
        const message = await Message.findByPk(messageId);
        if (!message) {
            throw new Error('Message not found');
        }

        if (message.receiverId !== userId) {
            throw new Error('Unauthorized');
        }

        message.read = true;
        await message.save();

        return message;
    }
}

module.exports = new MessageService();
