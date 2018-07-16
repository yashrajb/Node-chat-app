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
        jQuery("input[name='message']").val('');
    });
});

jQuery('#send-loc').click(function(){
    if(!navigator.geolocation){
        return alert("Hey your browser not supports the geolocation")
    }
    jQuery('#send-loc').attr("disabled",true).text('Sending Location....');
    navigator.geolocation.getCurrentPosition(function(positions){
        jQuery('#send-loc').attr("disabled",true).text('Send Location');
        var coords = {
            latitude:positions.coords.latitude,
            longitude:positions.coords.longitude
        }
        socket.emit('createLocationMessage',coords);
        
    }, function(){
        jQuery('#send-loc').removeAttr("disabled",true).text("Send Location");
    });

})

socket.on('newMessage',function(msg){
    var liElement = jQuery('<li></li>');
    liElement.text(`${msg.from} ${moment(msg.createdAt).format('hh:mm a')}:${msg.text}`);
    $('#all-messages').append(liElement);
});

socket.on('newLocationMessage',function(msg){
    var liElement = jQuery('<li></li>');
    var anchorElement = jQuery('<a target="_blank">My Location</a>');
    anchorElement.attr("href",msg.url);
    liElement.text(`${msg.from} ${moment(msg.createdAt).format('hh:mm a')}: `);
    liElement.append(anchorElement);
    $('#all-messages').append(liElement);
    jQuery('#send-loc').removeAttr("disabled");
});

jQuery('#send-weath').click(function(){

    if(!navigator.geolocation){
        return alert("Hey your browser not supports the geolocation")
    }
    jQuery('#send-weath').attr("disabled",true).text('Sending Weather....');
    navigator.geolocation.getCurrentPosition(function(positions){
        var lat = positions.coords.latitude;
        var lon = positions.coords.longitude;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bd9d472d8109b5b0d75782551b2f0890`)
        .then(function(response){
            socket.emit('createWeatherMessage',{
                main:response.data.weather[0].main,
                description:response.data.weather[0].description
            });
        });
    },function(){
        $('#send-weath').removeAttr("disabled").text("Send Weather");
    });
});

socket.on('newWeatherMessage',function(msg){
    var liElement = $("<li></li>");
    liElement.text(`${msg.from} ${moment(msg.createdAt).format('hh:mm a')}: Here weather is a ${msg.main},${msg.description}`);
    $('#all-messages').append(liElement);
    $("#send-weath").removeAttr("disabled").text("Send Weather");
})




   




