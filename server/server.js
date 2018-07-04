const path = require("path");
const express = require("express");
const app = express();
const http = require('http');
const socketIO = require('socket.io');
var port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');
const server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',function(socket){
    console.log('new connetion');
    socket.on('disconnect',function(){
        console.log('disconnected');
    });
   socket.emit('newMessage',{
       from:'basanyash@gmail.com',
       text:'Hello bro!',
       createdAt:new Date()
   });
   socket.on('createMessage',function(msg){
        console.log(msg);
   })
    socket.on('sendEmail',function(email){
        console.log(email);
    })
});
server.listen(port,function(){
    console.log(`server is started at the ${port}`);
})
