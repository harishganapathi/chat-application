var socket = io();
function submitinfo(){
          var from = $('#user').val();
          var message = $('#msg').val();
          if(message != '') {
          socket.emit('chatMessage', from, message);
}
$('#msg').val('').focus();
  return false;
}
function notifyTyping() {
  var user = $('#user').val();
  socket.emit('alertuser', user);
}
socket.on('chatMessage', function(from, msg){
  var me = $('#user').val();
  var color = (from == me) ? 'green' : '#009afd';
  var from = (from == me) ? 'Me' : from;
  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});
socket.on('alertuser', function(user){
  var me = $('#user').val();
  if(user != me) {
    $('#alertuser').text(user + ' is typing ...');
  }
  setTimeout(function(){ $('#alertuser').text(''); }, 10000);;
});
$(document).ready(function(){
  var name = makeid();
  $('#user').val(name);
  socket.emit('chatMessage', 'System', '<b>' + name + '</b>  joined the chat room');
});

function makeid() {
  var text = "";
  var names = "zxcvbnmasdfghjkl";

  for( var i=0; i < 5; i++ ) {
    text += names.charAt(Math.floor(Math.random() * names.length));
  }
  return text;
}
