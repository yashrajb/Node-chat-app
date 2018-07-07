const path = require("path");
const express = require("express");
const app = express();
const http = require('http');
const socketIO = require('socket.io');
var port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');
const server = http.createServer(app);
var io = socketIO(server);
const {generateMessages} = require('./utils/message');
app.use(express.static(publicPath));

io.on('connection',function(socket){
    console.log('new connetion');
    socket.on('disconnect',function(){
        console.log('disconnected');
    });

    socket.emit('newMessage',generateMessages('admin','welcome user'));
socket.broadcast.emit('newMessage',generateMessages('admin','new user is joined'));

   socket.on('createMessage',function(msg){
       io.emit('newMessage',generateMessages(msg.from,msg.text));
    // socket.broadcast.emit('newMessage',{
    //     from:msg.from,
    //     text:msg.text,
    //     createdAt:new Date().getTime()
    // })
   });
});
server.listen(port,function(){
    console.log(`server is started at the ${port}`);
})
