// var messeage = document.querySelector("#message").innerHTML;

var bns;
var k = 0;
var p= 0;
var idName ;
var input = document.getElementById("m");
$(function () {
    var socket = io('http://localhost:7110', { path: '/socket.io' }); // connect to server

   
 
    console.log("A USER CONNECTED");
    socket.emit('fromServer');
    socket.emit('disconnect');

    socket.on('fromServer', function (data) {
        $('#messages').append($('<li>').text(data));
    });

    socket.on('fromServerAssign', function (data) {
        // $('#messages').append($('<li>').text(data));
        idName = data;
    });
    socket.on('disconnect', function (data) {
        $('#messages').append($('<li>').text(data));
    });

    socket.on('chat message', function (msg) {
        messageAppend(wordFilter(msg));
    });
    $('form').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('chat message', idName +": " +$('#m').val());

        $('#m').val('');
        return false;
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
    var i = 3;
    for (i = 3 ; i < words.length ; i++)
    {
        // var messageOutput = document.createElement('button');
        // var appendChildElement = child.innerHTML.appendChild(messageOutput);
        // appendChildElement.innerHTML = words[i];
        // messageOutput.innerHTML = words[i];

        // apples.append($('<button>').text(words[i]+" "));
        output  =output+"<button id=" +k + ">"+ words[i] +"</button>"+ " ";
        console.log(words[i]);
        // document.getElementById(""+k).addEventListener('click',input.setAttribute("value", document.getElementById(""+k).innerHTML));   
        k = k +1 ;
    }
    $('#messages').append($('<li>').html(words[1] +" " +words[2] +output));

    // for (p = 0 ; p<= k; p++)
    // {
    //     document.getElementById(""+p).addEventListener('click',startText(document.getElementById(""+p).innerHTML));  
    // }
    // buttonStarter()
    ButtonAssign();
}
function output()
{
    console.log("TEST")
}

// function startText(){
//     document.getElementById("m").value = document.getElementById(""+p).innerHTML;
// }

function ButtonAssign()
{
    
    while(p<k)
    { 
    
        if(p<=k)
        {
            console.log(p);
            document.getElementById(""+p).addEventListener('click',function(){
                document.getElementById("m").value =document.getElementById("m").value+this.innerHTML+ " "}); 
            p = p +1;
        }
        
    
    }
}


