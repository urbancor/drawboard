var express = require('express');

var app = express();

//set port
var server = app.listen(3000);

app.use(express.static('public'));

console.log("Server is running");

var socket = require('socket.io');

var io = socket(server);

io.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection: '+socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data){
        socket.broadcast.emit('mouse', data);
        //console.log(data);
    }


}