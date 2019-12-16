//a code to show username on rightside.html
// document.getElementById("whoComesIn").outerHTML = "<p>" + newComer + "</p>";

$(function () {
    var socket = io('http://localhost:7110', { path: '/socket.io' }); // connect to server

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
        
        $('.list').remove();
        
      });
    
    //Sends the current list of Logged in Users. 
    socket.on('fromServerR', function (data) {
      console.log("this is " + data + "HW");
     
        $('#log').append($('<li class="list">').text(data));
    });


    socket.on('disconnect', function (data) {
        // $('#messages').append($('<li>').text(data));
    });

    socket.on('chat message', function (msg) {
        // messageAppend(wordFilter(msg));
    });
});
