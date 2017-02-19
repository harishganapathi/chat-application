var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
app.get('/', function(req, res){
  var express=require('express');
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, '../chat-application/views', 'index.html'));
});
io.on('connection', function(socket){
  socket.on('chatMessage', function(from, msg){
    io.emit('chatMessage', from, msg);
  });
  socket.on('alertuser', function(user){
    io.emit('alertuser', user);
  });
});
http.listen(3000, function(){
  console.log('hey dude listen to port 3k ;)');
});
