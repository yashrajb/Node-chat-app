const path = require("path");
const express = require("express");
const app = express();

const port = 3000 || process.env.port;
const publicPath = path.join(__dirname,'../public');
app.use(express.static(publicPath));


app.listen(port,() => {

console.log(`server is started at the ${port}`);

})
