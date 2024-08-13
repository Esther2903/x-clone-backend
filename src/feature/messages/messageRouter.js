const express = require('express');
const auth = require('../../middlewares/authMiddleware')
const messageController = require('./messageController');
const {uploadMessage} = require('../../middlewares/upload')


const messageRouter = express.Router();

messageRouter.post('/', auth, uploadMessage.single('picture'), messageController.sendMessage);
messageRouter.put('/:id', auth, uploadMessage.single('picture'), messageController.updateMessage);
messageRouter.delete('/:id', auth, messageController.deleteMessage);
messageRouter.get('/:id', auth, messageController.getMessageById);
messageRouter.get('/', auth, messageController.getAllMessagesForUser);
messageRouter.get('/mess/messagesRecieve', auth, messageController.getMessages);
messageRouter.put('/:id/read', auth, messageController.markAsRead);

module.exports = messageRouter;
