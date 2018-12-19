const http=require('http');

const path=require('path');
const socketIO=require('socket.io');
const express=require('express');
const publicPath=path.join(__dirname,'../public'); 
const {generateMessage}=require('./utils/message');
var port=process.env.PORT || 5000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath))
io.on("connection",(socket)=>
{
    console.log("new User connected");
    
    socket.emit('newMessage',generateMessage( "Admin","Welcome to Chat App"));
    socket.broadcast.emit('newMessage',generateMessage("shahid","new user Joined" ));
    
    socket.on('createMessage',(message,callback)=>
    {
        console.log("Create Message",message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('this is from server');
        
    });
    socket.on("disconnect",(socket)=>
        {
            console.log("User disconnected");
        });    
});
server.listen(port,()=>{
   console.log(`Server Connected ${port}`); 
});