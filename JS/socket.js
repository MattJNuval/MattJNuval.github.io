var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var people = new Array();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {//detects that a user connected
    console.log('a user connected');

    socket.on('disconnect', function (data) {
        console.log('user disconnected');
        data = 'A user disconnected'
        io.emit('disconnect', data);
    });
});

io.on('connection', function (socket) {
    socket.on('fromServer', function (data) {
        data = 'A user connected';
        io.emit('fromServer', data);
    });
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});

http.listen(7110, function () {
    console.log('listening on *:7110');
});

function assignment()
{
    
}