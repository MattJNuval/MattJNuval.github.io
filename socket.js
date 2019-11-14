let app = require('http').createServer(); //create HTTP server
let io = require('socket.io')(app, { path: '/socket.io' }); // bind Socket to HTTP server
app.listen(3000); // listen on port 3000
console.log('Listening for connection on port 3000');
io.on('connection', function (socket) {
    console.log('Socket connected');
    socket.emit('fromServer', { id: 'foo' }); //send message fromServer to client

    socket.on('fromClient', function (data) {
        console.log('Recieved ' + data.id + ' from client');
    });

});
