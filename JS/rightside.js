//a code to show username on rightside.html
// document.getElementById("whoComesIn").outerHTML = "<p>" + newComer + "</p>";

$(function () {
    var socket = io('http://34.94.156.131:7110', { path: '/socket.io' }); // connect to server

    $('form').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        // socket.emit('chat message', $('#m').val());

        $('#m').val('');
        return false;
    });

    console.log("A USER CONNECTED");
    socket.emit('fromServer');
    socket.emit('disconnect');

    //Recieves signal from server to refresh.
    socket.on('fromServerRefresh', function (data) {
        
        $('.list').remove();//rightside disconnect
        
      });
    //   socket.on('fromServerRemove', function (data) {
        

    //     $('.list').eq(parseInt(data,10)).remove();//rightside disconnect
        
    //   });
    
    //Sends the current list of Logged in Users. 
    socket.on('fromServerR', function (data) {
      console.log("this is " + data + " Has connected");
     
        $('#log').append($('<li class="list">').text(data));
    });


    socket.on('disconnect', function (data) {
        // $('#messages').append($('<li>').text(data));
    });

    socket.on('chat message', function (msg) {
        // messageAppend(wordFilter(msg));
    });
});
