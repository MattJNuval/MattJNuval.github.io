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

    socket.on('fromServer', function (data) {
      console.log("this is " + data);
        // $('#messages').append($('<li>').text(data));
    });

    socket.on('disconnect', function (data) {
        // $('#messages').append($('<li>').text(data));
    });

    socket.on('chat message', function (msg) {
        // messageAppend(wordFilter(msg));
    });
});
