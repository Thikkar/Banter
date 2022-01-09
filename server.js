if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = 3000 || process.env.PORT

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const http = require('http');
const socketio = require("socket.io");

require('newrelic');
var app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: '*'
    }
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const route = require("./routes/route");

//connect to mongoDB
const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect('mongodb://localhost:27017', mongoConfig);

//on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb @ 27017');
});

mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in database connection: ' + err);
    }
});

//io connection
io.on('connection', (socket) => {
   console.log('New Web Socket Connection Made!')
   console.log(socket.id)

   //not necessary for this app
   socket.on('join', (data) => {
       socket.join(data.article);

       console.log(data.username + ' joined the room ' + data.article)

       socket.broadcast.to(data.article).emit('new user joined', {username: data.username, message: 'has joined!'})
   });

   socket.on('comment', (data) => {
       //socket.to(data.article).emit('new comment', {username: data.username, comment: data.comment})
       socket.broadcast.emit('new comment', {_id: data.article, comment: data.comment, username: data.username, time: data.time})
       console.log("New comment posted by " + data.username + ": " + data.comment + ". Room id: " + data.article);
   });
})

//adding middleware: cors
app.use(cors());

app.use('/api', route);

server.listen(PORT, () => console.log('Server running on port: ' + PORT));