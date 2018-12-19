var socket = io();
socket.on("connect", function () {
    console.log("connected server");
});

socket.on("disconnect", function () {
    console.log("disconnected server");
});

socket.on('newMessage', function (message) {
  
    console.log('New Message', message);
});