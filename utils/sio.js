const { Server } = require('socket.io');
const logger = require('./logger');

class SocketIOHelper {
  constructor() {
    this.state = {
      io: null,
    };
  }

  initialize(server) {
    const origin = [/^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*\:)*?:?0*1$/];
    const io = new Server(server, {
      cors: {
        origin: origin.filter(v => v),
        methods: ['GET', 'POST'],
        allowedHeaders: ['sso-socket-header'],
        credentials: true,
        secure: true,
      },
      transports: ['websocket'],
      pingInterval: 1000 * 60 * 5,
      pingTimeout: 1000 * 60 * 3,
    });

    const socketInitNamespace = io.of('/api');
    socketInitNamespace.on('connect', function (socket) {
      logger.debug('server nsp->', socket.nsp.name); //server nsp-> /custom_nsp
    });

    io.of('/api').adapter.on('join-room', (room, id) => {
      logger.debug(`socket ${id} joined room: ${room} `);
    });

    this.state.io = socketInitNamespace;
    logger.info('Socket.io get ready');
  }

  emit_user({ user_id, data, queue }) {
    this.state.io?.sockets?.in(user_id).emit(queue, {
      type: queue,
      payload: data,
    });
  }
}

const socketio = new SocketIOHelper();

module.exports = {
  socketio,
};
