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

module.exports = {
    generateMessages,
    generateLocationMessages
}