// socket.js
import { io } from "socket.io-client";
import baseUrl from "@/utils/baseUrl";

export let socket;
export let activeUsers;

export function connectSocket(userId) {
  if (!userId) return;
  try {
    socket = io(baseUrl, {
      query: { userId },
    });
  } catch (error) {
    console.log(error);
  }
}
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
  }
}
