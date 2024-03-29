import debug from 'debug';
import http from 'http';
import app from '../app.js';

const debugServer = debug('exer:server');

const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}

const onError = (error) => {
    if (error.syscall !== 'listen') throw error;
    const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default: throw error;
    }
}


const onListening = () => {
    const addr = server.address();
    const bind = typeof PORT === 'string' ? 'Pipe' + addr : 'Port' + addr
    debugServer(`Listening on ${bind}`)
}

const PORT = normalizePort(process.env.PORT || '3000');

app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);
