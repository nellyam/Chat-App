const http = require('http');
const express = require('express');
const path = require('path');

PORT = 12345;

const app = express();
const server = http.createServer(app);

//////// EXPRESS ////////

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));


app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    res.redirect('/chat/' + req.body.username);
});

app.get('/chat/:username', (req, res) => {
    res.render('chat');
});

app.get('/chat/', (req, res) => {
    res.redirect('/login');
});

app.use((req, res) => {
   res.redirect('/login');
});

//////// SOCKET.IO ////////
const socket = require('socket.io');
const io = socket(server);

const messagesPosted = [];

io.on('connection', socket => {

    let userConnected;

    messagesPosted.forEach(message => {
       socket.emit('addNewMsg', message);
    });

    socket.on('userConnected', username => {
        userConnected = username;
    });

    socket.on('newMsg', data => {
       const date = new Date();

       const message = {
           content: data.message,
           user: userConnected,
           date: `${date.getHours()}:${date.getMinutes()} | ${date.getDate()}/${date.getMonth()}`
       }

       messagesPosted.push(message);

       io.sockets.emit('addNewMsg', message);
    });

});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
