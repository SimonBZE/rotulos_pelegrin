// utils/socket.js
import { io } from 'socket.io-client';
import { ENV } from './constants';

const socket = io(ENV.SOCKET_URL); // Reemplaza con la URL de tu servidor

export default socket;
