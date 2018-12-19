const http=require('http');

const path=require('path');
const socketIO=require('socket.io');
const express=require('express');
const publicPath=path.join(__dirname,'../public'); 
var port=process.env.PORT || 5000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath))
io.on("connection",(socket)=>
{
    console.log("new User connected");
    
    
    socket.on('createMessage',(message)=>
    {
        console.log("Create Message",message);
        io.emit('newMessage',{
        "from":message.from,
        "text":message.text, 
        createdAt:new Date().getTime()
    });
    });
    
    socket.on("disconnect",(socket)=>
          {
            console.log("User disconnected");
        });    
});
server.listen(port,()=>
          {
   console.log(`Server Connected ${port}`); 
});