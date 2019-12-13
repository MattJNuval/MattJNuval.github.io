var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var people = new Array();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {//detects that a user connected
    console.log('a user connected');
    //the following assumes "socket" as client
    socket.on("join", function() {//generate username
        
        var lengthOfPeople = people.length();
        people[socket.id] = RandomUserName();
        //assign username to connection

        console.log('for test only #2');
        for (var howManyTimes = 0; howManyTimes < lengthOfPeople; howManyTimes++) {

            //console.log(people[howManyTimes]);
            console.log('for test only');
        }


        //updates all of chat when a user joins
        io.sockets.emit("update", name + " has joined the server.");
        io.sockets.emit("update-people", people);
    });
    socket.on('disconnect', function () {//so far, does not detect when a user disconnects
        console.log('user disconnected');
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