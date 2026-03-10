import { io, SOCKET_URL } from '../imports';

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  reconnection: true,
});

const subscribeEvent = (
  eventName: string,
  callback: (...args: any[]) => void
) => {
  socket.on(eventName, callback);
};

const unsubscribeEvent = (
  eventName: string,
  callback?: (...args: any[]) => void
) => {
  if (callback) {
    socket.off(eventName, callback);
  } else {
    socket.off(eventName);
  }
};

export { socket, subscribeEvent, unsubscribeEvent };
