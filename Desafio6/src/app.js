const express = require('express');
const mongoConnect = require('./db');
const Router = require('./router');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const Messages = require('./models/messages.model');

const app = express();
const port = 3000; // Asegúrate de definir el puerto

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + '/src/public'));
app.use('/bootstrap', express.static(process.cwd() + '/node_modules/bootstrap/dist'));

// Configuración de Handlebars
const hbs = handlebars.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

app.engine('handlebars', hbs.engine);
app.set('views', process.cwd() + '/src/views');
app.set('view engine', 'handlebars');

const httpServer = app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

const io = new Server(httpServer);
const chats = []; // Asegúrate de definir chats

io.on('connection', (socket) => {
  socket.on('newUser', (data) => {
    socket.broadcast.emit('userConnected', data);
    socket.emit('messageLogs', chats);
  });

  socket.on('message', async (data) => {
    chats.push(data); // Guardar la data en un array
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
