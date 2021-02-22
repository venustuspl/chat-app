var client = null;
var color;
var date;

var input = document.getElementById("messageToSend");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("sendbutton").click();
  }
});

function showMessage(value, user, userColor, messageDate) {
    var newResponse = document.createElement('p');
    var oBr = document.createElement("br");
    newResponse.style.color = userColor;
    newResponse.style.fontSize = "x-large";
    newResponse.appendChild(document.createTextNode(messageDate));
    newResponse.appendChild(document.createTextNode("\n"));
    newResponse.appendChild(document.createTextNode(user));
    newResponse.appendChild(document.createTextNode(": "));
    newResponse.appendChild(document.createTextNode(value));
    var respone = document.getElementById('reponse');
    respone.appendChild(newResponse);
    respone.appendChild(oBr);
}

function connect() {
    client = Stomp.client('ws://localhost:8080/chat');
    color = getRandomColor();
    client.connect({}, function (frame) {
        client.subscribe("/topic/messages", function(message){
            showMessage(JSON.parse(message.body).value,
            JSON.parse(message.body).user,
            JSON.parse(message.body).userColor,
            JSON.parse(message.body).date)
        });
    })
}

function sendMessage() {
    var messageToSend = document.getElementById('messageToSend').value;
    var user = document.getElementById('user');

    var today = new Date();
    date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    console.log(dateTime);

    user.disabled = true;
    client.send("/app/chat", {},
    JSON.stringify({'value': messageToSend, 'user': user.value, 'userColor': color, 'date': dateTime}) );
    document.getElementById('messageToSend').value = "";
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}