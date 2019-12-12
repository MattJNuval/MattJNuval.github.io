// var messeage = document.querySelector("#message").innerHTML;

var bns;
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
        // $('#messages').append($('<li>').text(msg));
        messageAppend(wordFilter(msg));
    });
});



function wordFilter(output){
    // output = output.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    var words = output.split(" ");
   return words

}

//Appends a Message into 
function messageAppend(words)
{
    
    console.log(words[0]);
    var list = document.createElement("li");
   // var child = message.appendChild(list);
//    var apples = $('#messages').append($('<li>').text(""));
    var output= "";
    var i = 0;
    for (i = 0 ; i < words.length ; i++)
    {
        // var messageOutput = document.createElement('button');
        // var appendChildElement = child.innerHTML.appendChild(messageOutput);
        // appendChildElement.innerHTML = words[i];
        // messageOutput.innerHTML = words[i];

        // apples.append($('<button>').text(words[i]+" "));
        output  =output+"<button> " + words[i] +"</button>";
        console.log(words[i]);
    }
    $('#messages').append($('<li>').html(output));
    buttonStarter()
}

function  buttonStarter()
{
    // buttonAssign = document.querySelector("button");
    // buttonAssign.addEventListener('click', startText);
    bns = $("button");
    bns.on("click", startText);

}




function startText(){
    var input = document.querySelector("#m");
    input.setAttribute("value", bns.text()); 
}
