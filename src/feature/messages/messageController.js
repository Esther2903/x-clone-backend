const messageService = require('./messageService');

class MessageController {
    
    async sendMessage(req, res) {
        try {
            console.log(req.body);
    
            if (!req.body.content) {
                return res.status(400).json({ message: 'Content field is required' });
            }
    
            const messageData = {
                senderId: req.user.id,
                receiverId: req.body.receiverId,
                content: req.body.content, 
                picture: req.file ? req.file.path : ''
            };
            const message = await messageService.sendMessage(messageData);
            return res.status(201).json(message);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateMessage(req, res) {
        try {
            const messageData = {
                senderId: req.user.id,
                content: req.body.content, 
                picture: req.file ? req.file.path : ''
            };
            const message = await messageService.updateMessage(req.params.id, messageData);
            return res.status(200).json(message);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteMessage(req, res) {
        try {
            await messageService.deleteMessage(req.params.id, req.user.id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getMessageById(req, res) {
        try {
            const message = await messageService.getMessageById(req.params.id, req.user.id);
            return res.status(200).json(message);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }

    async getAllMessagesForUser(req, res) {
        try {
            const messages = await messageService.getAllMessagesForUser(req.user.id);
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getMessages(req, res) {
        try {
            const userId = req.user.id;
            console.log(userId);
            const messages = await messageService.getMessagesByUserId(userId);
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async markAsRead(req, res) {
        try {
            const message = await messageService.markAsRead(req.params.id, req.user.id);
            return res.status(200).json(message);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new MessageController();
