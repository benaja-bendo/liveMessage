const express = require('express');
const app = express();
const path = require('path');


const http = require('http').Server(app);
const port = process.env.PORT || 8080;

//attach socket.io to the http server
const io = require('socket.io')(http);

// routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'));
});


//create a new connection
io.on('connection', socket => {
    console.log("A user connected");

    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });
    socket.on('message', msg => {
        console.log(`Message: ${msg}`);
        io.emit('message', msg);
    })

    //emit event to all clients
    socket.emit('server', "Received from server");
});

http.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});