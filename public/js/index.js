var socket = io();
socket.on("connect", function () {
    console.log("connected server");
});

socket.on("disconnect", function () {
    console.log("disconnected server");
});

socket.on('newMessage', function (message) {
  
    console.log('New Message', message);
    var li=jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`);
    jQuery("#message").append(li);
});

//socket.emit("createMessage",{"from":"Rushita","text":"hello"},function(data){ console.log('got it',data) })

jQuery('#message-form').on('submit',function(e)
{
    e.preventDefault();
    socket.emit('createMessage',{
        from:"shahid",
        text:jQuery('[name=message]').val()
    },function()
    {
        
    });
});