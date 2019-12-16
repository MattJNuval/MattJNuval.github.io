var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var transferredData = new Array();
//transfferedData[0] = "not used";

//var formerUsed = ['Cool', 'Good', 'Plain', 'Kind', 'Badass'];//do we need this?
//var latterUsed = ['people', 'AI', 'alien', 'android', 'wanderer'];//do we need this?

var unique1 = [];
var unique2 = [];
var nameAssigned = [];
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


var p = 1;
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function (data) {
        if(p%2 == 1)
        {
            console.log('user disconnected');
            data = transferredData + " disconnected";//transferredData USE HERE !
            io.emit('disconnect', data); 
            
            //TODO: Need Work for disconnect Function

            // for (l = 0 ; unique1.length ; l ++)
            // {
            //     if (socket.id == unique1[l] || socket.id == unique2[l])
            //     {
            //         io.emit('disconnect', nameAssigned); 
            //         unique1.splice(l,1);
            //         unique2.splice(l,1);
            //         nameAssigned.splice(l,1);
            //     }
            // }
            // io.emit('fromServerRefresh', "");
            // for ( k = 0; k < nameAssigned.length ; k++)
            // {
            //     io.emit('fromServerR', nameAssigned[k]);
            // }
            
            p++;
        }
        else{
            p++;
        }
        
    });
});

var t = 1;
io.on('connection', function (socket) {
    socket.on('fromServer', function (data) {

        //console.log( "HELLO OUTSIDE USER HAS ENTERED");

        if(t%2 == 1)
        {
            //Gets the SocketID and stores it to Unique1 list
            unique1.push(socket.id);

            //Grabs Unique Name
            data = randomUserName();

            transferredData = data;//update transferredData
            t++; 
            
            //Send a General msg to all users that a user has connected
            io.emit('fromServer', data + " has connected");
            
            //Sends message to specific Socket ID
            io.to(socket.id).emit('fromServerAssign', data );
            
            //Saves the Name Assigned to a List
            nameAssigned.push(data);
            
            //Tells the Right Hand Side to Refresh
            io.emit('fromServerRefresh', "");

            //Sends a New list of Names
            for ( k = 0; k < nameAssigned.length ; k++)
            {
                io.emit('fromServerR', nameAssigned[k]);
            }
        }
        else{
            t++;
            
            //Push assigned ID again, just in case chat is on the second unique ID. 
            io.to(socket.id).emit('fromServerAssign', data );

            //Saves Unique2 ID to a List.
            unique2.push(socket.id);
        }   
       
    });
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', " " + msg);
    });
});

http.listen(7110, function () {
    console.log('listening on *:7110');
});



//TODO: Fix Random Generator, currently can assign undefine. 
function randomUserName(){


    var formerUsed = ['Cool', 'Good', 'Plain', 'Kind', 'Badass']
    var latterUsed = ['people', 'AI', 'alien', 'android', 'wanderer']
  
    var realFormerUsed = formerUsed[Math.floor(Math.random() * 3)];//generate random number between 0 to 4
    var realLatterUsed = latterUsed[Math.floor(Math.random() * 3)];
  
    return (realFormerUsed  + " " + realLatterUsed);
      
}