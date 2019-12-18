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
var formerUsed = ['Cool', 'Good', 'Plain', 'Kind', 'Badass', 'Red', 'Green', 'Blue', 'Yellow', 'Black', 'White', 'Gold', 'Sliver', 'Grey']
var latterUsed = [ 'AI', 'Alien', 'Android', 'Wanderer', 'Robot', 'Comp', 'Pineapple', 'Apple', 'Pear', 'Orange', 'Fruit', 'Bottle', 'Candy']

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
            // data = transferredData + " disconnected";//transferredData USE HERE !
            data = unique1;
            // io.emit('disconnect', data); 
            
            //TODO: Need Work for disconnect Function

            for (l = 0 ; l< unique1.length ; l++)
            {
                if (socket.id == unique1[l] || socket.id == unique2[l])
                {
                    data = nameAssigned[l]
                    io.emit('disconnect', data+ " disconnected"); 
                    unique1.splice(l,1);
                    unique2.splice(l,1);
                    nameAssigned.splice(l,1);

                }
            }
            io.emit('fromServerRefresh', "");
            for ( k = 0; k < nameAssigned.length ; k++)
            {
                data = nameAssigned[k];
                io.emit('fromServerR', data);
            }
            
            p++;
        }
        else{
            p++;
        }
        
    });
});

var t = 1;
var check  = false;
io.on('connection', function (socket) {
   
    socket.on('fromServer', function (data) {

        //console.log( "HELLO OUTSIDE USER HAS ENTERED");

        
        if(t%2 == 1)
        {
            //Gets the SocketID and stores it to Unique1 list
            unique1.push(socket.id);

            //Grabs Unique 
            if (!check){
                // data = nameCheck(randomUserName());
                data =nameCheck(randomUserName());
                 //Send a General msg to all users that a user has connected
            io.emit('fromServer', data + " has connected");
            
            //Sends message to specific Socket ID
            io.to(socket.id).emit('fromServerAssign', data );
            console.log("HELO WORLD" + data);
            
            //Saves the Name Assigned to a List
            nameAssigned.push(data);
            
            //Tells the Right Hand Side to Refresh
            io.emit('fromServerRefresh', "");
                check = true;
            }
            else{
                check = false;
            }
            

            transferredData = data;//update transferredData
            t++; 
            
           

            //Sends a New list of Names
            for ( k = 0; k < nameAssigned.length ; k++)
            {
                io.emit('fromServerR', nameAssigned[k]);
            }
        }
        else{
            t++;
            if (!check){
                // data = nameCheck(randomUserName());
                data = nameCheck(randomUserName());
                //Push assigned ID again, just in case chat is on the second unique ID. 
            io.to(socket.id).emit('fromServerAssign', data );
            console.log("HELO WORLD" + data);

            //Saves Unique2 ID to a List.
            unique2.push(socket.id);
                check = true;
            }
            else{
                check = false;
            }
            
        }   
       
    });
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', " " + msg);
    });
});

// when the client emits 'typing', we broadcast it to others
io.on('connection', function (socket) {
socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      transferredData: socket.data
    });
  });
// when the client emits 'stop typing', we broadcast it to others
socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
        transferredData: socket.data
    });
  });
});
http.listen(7110, function () {
    console.log('listening on *:7110');
});



//TODO: Fix Random Generator, currently can assign undefine. 
function randomUserName(){


  
    var realFormerUsed = formerUsed[Math.floor(Math.random() * Math.floor(formerUsed.length) )];//generate random number between 0 to 4
    var realLatterUsed = latterUsed[Math.floor(Math.random() * Math.floor(latterUsed.length) )];
  
    return (realFormerUsed  + " " + realLatterUsed);
      
}
// Felix's Code still a bit broken
// var generatedNamesStored = new Array();
// var abc = 0;//used as index number

// var formerUsed = ['Cool', 'Good', 'Plain', 'Kind', 'Badass']
// var latterUsed = ['people', 'AI', 'alien', 'android', 'wanderer']//total 5x5=25 combinations available
// var realFormerUsed;
// var realLatterused;

function nameCheck( output)
{
    var name = output;
    for (m = 0 ; m < nameAssigned.length; m++){
        if (output === nameAssigned[m] || output === undefined){
            name = nameCheck(randomUserName());
            console.log(output + " : " + name);
            break;
        }

    }
    return name;

}
// function randomUserName(){

//     if (generatedNamesStored.length == 0){//if doing the first generation

//         realFormerUsed = formerUsed[Math.floor(Math.random() * 5)];//generate random number between 0 to 4
//         realLatterUsed = latterUsed[Math.floor(Math.random() * 5)];//fixed from 4 to 5 to work correct

//         generatedNamesStored[0] = realFormerUsed  + " " + realLatterUsed;//put the first generated into index zero.
//         return (realFormerUsed  + " " + realLatterUsed);//just generate and return the random username.
//         abc++;//abc becomes 1 here
//     }
    
//     else //if NOT first generation -> then we need filter algorithm to avoid duplication using includes method.

//     {

//     do {
//         realFormerUsed = formerUsed[Math.floor(Math.random() * 5)];//generate random number between 0 to 4
//         realLatterUsed = latterUsed[Math.floor(Math.random() * 5)];//fixed from 4 to 5 to work correct
//     } while (generatedNamesStored.includes == realFormerUsed + " " + realLatterused);

//     generatedNamesStored[abc] = realFormerUsed  + " " + realLatterUsed;
//     abc++;
//     return (realFormerUsed  + " " + realLatterUsed);
//     } 

    
// }
//randomUserName() function ends

