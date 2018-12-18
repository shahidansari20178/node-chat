var socket = io();
var msg="";
socket.on("connect", function () {
    console.log("connected server");
});

var s={
    "to": "shahid@gmail.com",
    "text": "hello"
};
socket.emit('createMessage',s);
socket.on("disconnect", function () {
    msg+="name:"+s.to+" text:"+s.text+"<br>";
    console.log("disconnected server");
});

socket.on('newMessage', function (message) {
    //msg+="name:"+email.from+" text:"+email.text+"Time :"+email.createdAt+"<br>";
    console.log('New Message', message);
});