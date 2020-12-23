/*eslint no-undef: "error"*/
/*eslint-env node*/
"use strict"
var express = require('express');
const path = require('path')
var app = express();

app.use('/', express.static(__dirname + '/dist'))

app.get('/', function(req, res, next){

  let options = {
    root: path.join(__dirname, 'dist')    
  };

  const fileName = 'index.html'

  res.sendFile(fileName, options, () => {  
    console.log("Sending file ", fileName);
    next();
  });

});

// app.get('/',function(req,res){
//   console.log("File Sent")
//   // res.send();
// });

//port for heroku
let port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('App running on port ' + port);
});