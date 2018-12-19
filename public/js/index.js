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
var flag=0; 
var name="";
jQuery('#message-form').on('submit',function(e)
{
    e.preventDefault();
    if(flag==0)
    {
        name=$("#nm").val();
        $("#nm").hide();
        flag=1;
    }
    
    socket.emit('createMessage',{
        from:name,
        text:jQuery('[name=message]').val()
    },function()
    {
        
    });
    $("#nm").val(' ');
});