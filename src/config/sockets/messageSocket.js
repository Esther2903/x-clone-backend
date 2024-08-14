const messageService = require('../../feature/messages/messageService')

module.exports = (io) => {
    io.on("conection", (socket) => {
        console.log('User connected: ', socket.id);

        socket.on('joinRoom', (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined their room`);
        });

        socket.on('sendMessage', async (data) => {
            try {
                const message = await messageService.sendMessage(data);
                io.to(data.receiverId).emit('receiveMessage', message);
            } catch (error) {
                socket.emit('error', error.message);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
}