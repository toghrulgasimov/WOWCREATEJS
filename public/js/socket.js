let socket = io();
var socket = io();

e.preventDefault();

// soz tapilanda emit ele
socket.emit('data', "0");
