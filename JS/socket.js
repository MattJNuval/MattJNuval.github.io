var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var formerUsed = ['Cool', 'Good', 'Plain', 'Kind', 'Badass'];
var latterUsed = ['people', 'AI', 'alien', 'android', 'wanderer'];


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


var  p = 1;
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function (data) {
        if(p%2 == 1)
        {
            console.log('user disconnected');
            data = 'A user disconnected'
            io.emit('disconnect', data);
            p++;
        }
        else{
            p++;
        }
        
    });
});

var  k = 1;
io.on('connection', function (socket) {
    socket.on('fromServer', function (data) {

        console.log( "HELLO OUTSIDE USER HAS ENTERED");

        if(k%2 == 1)
        {
            console.log( "HELLO INSIDE USER HAS ENTERED");
            data = randomUserName();
            k++; 
            io.emit('fromServer', data);
        }
        else{
            k++;
        }
       
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

function randomUserName(){


    var formerUsed = ['Cool', 'Good', 'Plain', 'Kind', 'Badass']
    var latterUsed = ['people', 'AI', 'alien', 'android', 'wanderer']
  
    var realFormerUsed = formerUsed[Math.floor(Math.random() * 5)];//generate random number between 0 to 4
    var realLatterUsed = latterUsed[Math.floor(Math.random() * 5)];
  
    return (realFormerUsed  + " " + realLatterUsed);
      
}