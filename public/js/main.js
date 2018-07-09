var socket = io();
socket.on('connect',function(){
    console.log('connected');
});
socket.on('disconnect',function(){
    console.log('disconnected');
});
jQuery('#message-form').submit(function(e){
e.preventDefault();
var from = 'admin';
var text = jQuery("input[name='message']").val();
    socket.emit('createMessage',{
        from,
        text,
        createdAt:new Date().getTime()
    },function(ack){
    });
});

jQuery('#send-loc').click(function(){
    if(!navigator.geolocation){
        return alert("Hey your browser not supports the geolocation")
    }
    navigator.geolocation.getCurrentPosition(function(positions){
        var coords = {
            latitude:positions.coords.latitude,
            longitude:positions.coords.longitude
        };
        socket.emit('createLocationMessage',coords);
    });
})

socket.on('newMessage',function(msg){
    var liElement = jQuery('<li></li>');
    liElement.text(`${msg.from}:${msg.text}`);
    $('#all-messages').append(liElement);
});

socket.on('newLocationMessage',function(msg){
    var liElement = jQuery('<li></li>');
    var anchorElement = jQuery('<a target="_blank">My Location</a>');
    anchorElement.attr("href",msg.url);
    liElement.text(`${msg.from}: `);
    liElement.append(anchorElement);
    $('#all-messages').append(liElement);
})


