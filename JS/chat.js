// var messeage = document.querySelector("#message").innerHTML;

var bns;
var k = 0;
var p= 0;
var idName;
var input = document.getElementById("m");
// input.addEventListener('keyup', alertNewMsg);

//socket and corresponding port number
$(function () {
    var socket = io('http://34.94.156.131:7110', { path: '/socket.io' }); // connect to server

   
 
    console.log("A USER CONNECTED");
    socket.emit('fromServer');
    socket.emit('disconnect');

    socket.on('fromServer', function (data) {
        $('#messages').append($('<li>').text(data));
    });

    //Recieves assignment of ID from Server. 
    socket.on('fromServerAssign', function (data) {
        // $('#messages').append($('<li>').text(data));
        idName = data;
        console.log("I AM CHAT " + data);
        if (idName == null || idName == undefined)
        {
            idName = data;
        }

    });
    socket.on('disconnect', function (data) {
        $('#messages').append($('<li>').text(data));
    });

    socket.on('chat message', function (msg) {
        messageAppend(wordFilter(msg));
    });

    //Appends all Msg sent to general group with IdName. 
    $('form').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('chat message', idName +": " +$('#m').val());

        $('#m').val('');
        return false;
    });
});

// function alertNewMsg()
// {
//     socket.broadcast.emit('newMessage',"Typing Msg " + idName);
    
// }

//splits messages into individual words
function wordFilter(output){
    // output = output.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    var words = output.split(" ");
   return words

}

//Appends a Message into chat.html
function messageAppend(words)
{
    //messages appended in list format
    console.log(words[0]);
    var list = document.createElement("li");
 
    var output= "";
    // i is 3 because the first few blocks of words is the userName. 
    var i = 3;
    for (i = 3 ; i < words.length ; i++)
    {//each word is output as a clear clickable button with text
        output  =output+"<button id=" +k + " class='button'" + ">"+ words[i] +"</button>"+ " ";
        console.log(words[i]);
        
        k = k +1 ;
    }
    $('#messages').append($('<li>').html("<strong>"+words[1] +" " +words[2]+"</strong>" +output));
    
    buttonAssign();
}


function output()
{
    console.log("TEST")
}


//sets clicked words (buttons) as new context
function buttonAssign()
{    
    while(p<k)
    {    
        if(p<=k)
        {
            console.log(p);
            document.getElementById(""+p).addEventListener('click',function(){
                document.getElementById("m").value =document.getElementById("m").value+this.innerHTML+ " "}); 
                // alertNewMsg();
                
            p = p +1;
        }
    }
}

// // Adds the visual chat typing message
// function addChatTyping (data) {
//     data.typing = true;
//     data.message = 'is typing';
//     addChatMessage(data);
//   }

//   // Removes the visual chat typing message
//   function removeChatTyping (data) {
//     getTypingMessages(data).fadeOut(function () {
//       $(this).remove();
//     });
//   }
//    // Updates the typing event
//    function updateTyping () {
//     if (connected) {
//       if (!typing) {
//         typing = true;
//         socket.emit('typing');
//       }
//       lastTypingTime = (new Date()).getTime();

//       setTimeout(function () {
//         var typingTimer = (new Date()).getTime();
//         var timeDiff = typingTimer - lastTypingTime;
//         if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
//           socket.emit('stop typing');
//           typing = false;
//         }
//       }, TYPING_TIMER_LENGTH);
//     }
//   }

//   // Gets the 'X is typing' messages of a user
//   function getTypingMessages (data) {
//     return $('.typing.message').filter(function (i) {
//       return $(this).data('Idname') === data.idName;
//     });
//   }

