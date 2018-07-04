const path = require("path");
const express = require("express");
const app = express();

var port = 3000 || process.env.PORT;
const publicPath = path.join(__dirname,'../public');
app.use(express.static(publicPath));


app.listen(port,() => {

console.log(`server is started at the ${port}`);

})
