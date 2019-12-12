
//Gets Message Inner HTML
var messeage = document.querySelector("#message").innerHTML;
var button = document.querySelector(".button");
var input = document.querySelector("#id").innerHTML;


button.addEventListener('click', startText);
//Filters the Message into an Array.




// $(function () {
//     var socket = io('http://13.52.224.61:7110', { path: '/socket.io' }); // connect to server
//     $('form').submit(function (e) {
//         e.preventDefault(); // prevents page reloading
//         socket.emit('chat message', $('#m').val());
//         $('#m').val('');
//         return false;
//     });
//     socket.on('chat message', function (msg) {
//         $('#messages').append($('<li>').text(msg));
//     });
// });



function wordFilter(output){
    output = output.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    var words = output.split(" ");
   return words

}

//Appends a Message into 
function messageAppend(words)
{
    var list = document.createElement("li");
    var child = message.appendChild(list);

    for (i = 0 ; i < words.length-1 ; i++)
    {
        var messageOutput = document.createElement('button');
        var appendChildElement = child.innerHTML.appendChild(messageOutput);
        appendChildElement.innerHTML = words[i];
    }

}

function startText(){

    input = button.innerHTML;
}
