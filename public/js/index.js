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


socket.on('newLocationMessage',function(message)
{
var li=jQuery('<li></li>');    
    //var a=jQuery('<a></a>');
    var a=jQuery(' <a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#message').append(li);
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
    $("#msg").val('');
});

jQuery("#send-l").on('click',function()
{
    if(!navigator.geolocation)
        {
            return alert("geolocation not support by browser");
        }
    navigator.geolocation.getCurrentPosition(function(position){
        //console.log(position);
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude    
        });
    },function(){
        
                alert("some error occur");
    });
});
