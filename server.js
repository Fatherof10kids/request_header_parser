var express = require('express');
var app = express();

var port = process.env.PORT || 5000;

app.set('port',port);

var route = express.Router();

route.get('/route',(req,res)=>{
    res.end("this is route");
});

app.use('/home',route);

app.get('/home',(req,res)=>{
  res.end("welcome to homepage");
})

app.listen(port, console.log("server is starting at port",app.get('port')));
