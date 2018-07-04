var socket = io();
socket.on('connect',function(){
    console.log('connected');
});
socket.on('disconnect',function(){
    console.log('disconnected');
});
socket.on('newMessage',function(msg){
    console.log('new message',msg);
});
socket.emit('createMessage',{
    from:'yashraj basan',
    text:'hello bro!'
});

