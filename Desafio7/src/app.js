const express = require('express');
const mongoConnect = require('./db');
const Router = require('./router');
const exphbs = require('express-handlebars');
const { Server } = require('socket.io');
const Messages = require('./models/messages.model');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + '/src/public'));
app.use('/bootstrap', express.static(process.cwd() + '/node_modules/bootstrap/dist'));

// Configuración de Handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: process.cwd() + '/src/views/layouts',
    partialsDir: process.cwd() + '/src/views/partials',
    extname: '.hbs',
    cache: false
}));
app.set('view engine', '.hbs');
app.set('views', process.cwd() + '/src/views');

const httpServer = app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

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

app.locals.io = io;

mongoConnect();

Router(app);
