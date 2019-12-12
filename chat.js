$(function () {
    var socket = io('http://13.52.224.61:7110', { path: '/socket.io' }); 
    // connect to server
    $('form').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function (msg) {
        $('#messages').append($('<li>').text(msg));
    });
});
