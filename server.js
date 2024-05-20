
// const { createServer } = require('http');
// const next = require('next');
// const { parse } = require('url');
// const SocketIO = require('socket.io');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = createServer((req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   });

//   const io = SocketIO(server);

//   io.on('connection', (socket) => {
//     console.log('New client connected');

//     socket.on('disconnect', () => {
//       console.log('Client disconnected');
//     });
//   });

//   server.listen(3000, (err) => {
//     if (err) throw err;
//     console.log('> Ready on http://127.0.0.1:3000');
//   });

//   // Hacer que io esté disponible globalmente
//   global.io = io;
// });




// const { createServer } = require('http');
// const next = require('next');
// const { parse } = require('url');
// const SocketIO = require('socket.io');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = createServer((req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   });

//   const io = SocketIO(server, {
//     cors: {
//       origin: "*", // Asegúrate de permitir tu dominio de producción aquí
//       methods: ["GET", "POST"]
//     }
//   });

//   io.on('connection', (socket) => {
//     console.log('New client connected');

//     socket.on('disconnect', () => {
//       console.log('Client disconnected');
//     });
//   });

//   server.listen(process.env.PORT || 3000, (err) => {
//     if (err) throw err;
//     console.log('> Ready on http://localhost:3000');
//   });

//   // Hacer que io esté disponible globalmente
//   global.io = io;
// });



const { createServer } = require('http');
const next = require('next');
const { parse } = require('url');
const SocketIO = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = SocketIO(server, {
    cors: {
      origin: "http://localhost:3000", // Asegúrate de permitir tu dominio de desarrollo aquí
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    // Aquí puedes gestionar diferentes eventos recibidos del cliente
    socket.on('NEW_MESSAGE', (message) => {
      console.log('Received new message:', message);
      // Lógica para manejar el nuevo mensaje
      io.emit('NEW_MESSAGE', message);
    });

    socket.on('UPDATE_PROJECT', (update) => {
      console.log('Received project update:', update);
      // Lógica para manejar la actualización del proyecto
      io.emit('UPDATE_PROJECT', update);
    });

    // Puedes agregar más eventos según sea necesario
  });

  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });

  // Hacer que io esté disponible globalmente
  global.io = io;
});

