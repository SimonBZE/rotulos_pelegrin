// server.js
const { createServer } = require('http');
const next = require('next');
const { parse } = require('url');
const SocketIO = require('socket.io');
import {ENV} from '@/utils/constants'

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = SocketIO(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${ENV.SOCKET_URL}`);
  });

  // Hacer que io esté disponible globalmente
  global.io = io;
});
