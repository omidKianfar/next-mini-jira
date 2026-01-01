import { io } from "socket.io-client";

// config
import { SOCKET_URL } from "@/configs/socket";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
});

export const subscribeEvent = (
  eventName: string,
  callback: (...args: any[]) => void,
) => {
  socket.on(eventName, callback);
};

export const unsubscribeEvent = (
  eventName: string,
  callback?: (...args: any[]) => void,
) => {
  if (callback) {
    socket.off(eventName, callback);
  } else {
    socket.off(eventName);
  }
};
