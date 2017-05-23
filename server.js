var express = require('express');
var app = express();

var port = process.env.PORT || 5000;

app.set('port',port);

// route is for mini app, my code's orgarnization will look better
// in the future, using route as inside in a custom module
var route = express.Router();

// header parser
route.get('/whoami',(req,res)=>{
    var ip;
     var userAgentString = req.headers['user-agent'];
     var languageString = req.headers['accept-language'];

     // 'x-forwarded-for' header may return multiple IP addresses in
   // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
   // the first one
     if(req.header('x-forwarded-for')){
       var arrIp=req.header('x-forwarded-for').split(',');
       ip = arrIp[0];
       console.log( req.header('x-forwarded-for').split(',')[0]);
     }
     else{
       ip =req.connection.remoteAddress;
     }

// get language
 var arrLang = languageString.split(',');
 var language = arrLang[0];

// get operating system
var regex = /\(([^\)]+)\)/;
var operatingSys = userAgentString.match(regex)[1]; // 

// respond
var resObj ={
  "ipaddress" : ip,
  "language": language,
  "software": operatingSys
}

    res.json(resObj);
});

route.get('/another route',(req,res)=>{
  res.end("this is another route");
});

app.use('/api',route);

app.get('/home',(req,res)=>{
  res.end("welcome to homepage");
});

app.listen(port, console.log("server is starting at port",app.get('port')));
