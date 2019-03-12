var express = require('express');
var app = express();

var isOn = false;

app.listen(3000,()=>{
    console.log("Listening on port 3000");

    app.get('/',(req,res) => {
        res.sendFile(__dirname+'/index.html');
    });

    app.get('/ping',(req,res) => {
        res.status(200).send({msg:'pong'});
    });

    app.get('/search',(req,res) => {
        console.log(req.query);
        res.sendStatus(200);
    });

    app.get('/user/:id',(req,res) => {
        console.log(req.params);
        res.sendStatus(200);
    });

    //--------------------------------------

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // status of locker (On-Off)
    app.get('/status',(req,res) => {
        res.status(200).send({status: isOn});
    });

    // toggle of locker (Switch)
    app.get('/toggle',(req,res) => {
        isOn = !isOn;
        res.sendStatus(200);
    });

    app.use("/css", express.static(__dirname + '/css'));
    app.use("/js", express.static(__dirname + '/js'));
    app.use("/img", express.static(__dirname + '/img'));
    app.use("/fonts", express.static(__dirname + '/fonts'));
});