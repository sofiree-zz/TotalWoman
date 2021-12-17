const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
// const formatMessage = require('./helpers/formatDate')
// const {
//     getActiveuser,
//     exitForum,
//     getIndividualUser,
//     newUser
// } = require('./helpers/userHelper');


const app = express()
const server = http.createServer(app);
const io = socketio(server);

const PORT =3000 || process.env.PORT

// i could also set the public folder this like this (__dirname, './../Public') incase the public folder is not in the same directory
app.use(express.static(path.join(__dirname, 'Public')));





app.listen(PORT, () => console.log(`App is live on port ${PORT}`))