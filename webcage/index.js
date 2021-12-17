const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./helpers/formatDate')

const app = express()

const PORT =3000 || process.env.PORT

app.use(express.static(path.join(__dirname, 'ChatApp')))
app.listen(PORT, () => console.log(`App is live on port ${PORT}`))