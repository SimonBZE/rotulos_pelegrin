// utils/socket.js
import { io } from 'socket.io-client';
import { ENV } from './constants';

const socket = io(ENV.SOCKET_URL, {
    transports: ['websocket', 'polling'],
  });
export default socket;
