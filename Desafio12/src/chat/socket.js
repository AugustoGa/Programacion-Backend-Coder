const { Server } = require('socket.io');
const Messages = require('../models/messages.model');

function initializeSocket(httpServer) {
    const io = new Server(httpServer);
    const chats = [];

    io.on('connection', (socket) => {
        socket.on('newUser', (data) => {
            socket.broadcast.emit('userConnected', data);
            socket.emit('messageLogs', chats);
        });

        socket.on('message', async (data) => {
            chats.push(data);
            io.emit('messageLogs', chats);

            try {
                const newMessage = {
                    user: data.user,
                    message: data.message,
                };
                await Messages.create(newMessage);
            } catch (error) {
                console.log(error);
            }
        });
    });

    return io;
}

module.exports = initializeSocket;
