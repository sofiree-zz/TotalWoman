const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./helpers/formatDate')
const {
    getActiveuser,
    exitForum,
    getIndividualUsers,
    newUser
} = require('./helpers/userHelper');


const app = express()
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000 || process.env.PORT

// i could also set the public folder this like this (__dirname, './../Public') incase the public folder is not in the same directory
app.use(express.static(path.join(__dirname, 'Public')));

io.on('connection', socket => {
    socket.on('joinForum', ({ email, password }) => {
        const user = newUser(socket.id, email, forum);

        socket.join(user.forum);

        // broadcast everytime someone joins the forum
        socket.broadcast
            .to(user.forum)
            .emit('message', formatMessage("TotalWoman", `${user.email} has joined the chat`));


        // current user and forum
        io.to(user.forum).emit('forumUsers', {
            forum: user.forum,
            users: getIndividualUsers(user.forum)
        });
    });

    // listen to client message
    socket.on('chatMessage', msg => {
        const user = getActiveuser(socket.id);

        io.to(user.forum).emit('message', formatMessage(user.email, msg));
    });

    // when a client diconnects

    socket.on('disconnect', () => {
        const user = exitForum(socket.id);

        if (user) {
            io.to(user.forum).emit(
                'message',
                formatMessage("TotalWoman", `${user.email} has left the room`)
            );
            io.to(user.forum).emit('forumUsers', {
                forum: user.forum,
                users: getIndividualUsers(user.forum)
            });
        }
    });

});



app.listen(PORT, () => console.log(`App is live on port ${PORT}`))