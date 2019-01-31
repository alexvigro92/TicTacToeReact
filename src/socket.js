import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:4000');

function subscribeToTicTacToe(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTicTacToe', 500);
}

export { subscribeToTicTacToe };
