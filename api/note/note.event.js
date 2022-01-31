const { socket } = require('../../config/socket');

function emitEvent(note) {
  socket.io.emit('note:create', note);
}

module.exports = {
  emitEvent,
};
