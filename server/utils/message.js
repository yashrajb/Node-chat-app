const axios = require('axios');
var generateMessages = function(from,text){
    return {
        from,
        text,
        createdAt:new Date().getTime()
    }
}

var generateLocationMessages = function(from,latitude,longitude){
 return {
     from,
     url:`https://www.google.com/maps?q=${latitude},${longitude}`,
     createdAt:new Date().getTime()
 }
}

var generateWeatherMessages =  function(from,latitude,longitude){
    var res = {};
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=bd9d472d8109b5b0d75782551b2f0890`)
    .then(function(response){
        res = response.data.weather;
    });

    console.log(res);
}

module.exports = {
    generateMessages,
    generateLocationMessages
}