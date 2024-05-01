const express = require('express')
const mongoConnect = require('./db/server')
const Router = require('./routers/index.router')
const exphbs = require('express-handlebars');
const { Server } = require('socket.io')
const cookieParser = require('cookie-parser')
const initializePassport = require('./config/passport.config')
const passport = require('passport')

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(process.cwd() + '/src/public'))
app.use('/bootstrap', express.static(process.cwd() + '/node_modules/bootstrap/dist'))

//Session

app.use(cookieParser())
//passport
initializePassport()
app.use(passport.initialize())


// Configuración de Handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: process.cwd() + '/src/views/layouts',
    partialsDir: process.cwd() + '/src/views/partials',
    extname: '.hbs',
    cache: false
});

app.engine('.hbs', hbs.engine);
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

    socket.on('message', (data) => {
        chats.push(data);
        io.emit('messageLogs', chats);
    });
});

app.locals.io = io;

mongoConnect();

Router(app);