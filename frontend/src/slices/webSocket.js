import { useEffect } from 'react';
import io from 'socket.io-client';

const WebSocket = () => {
  useEffect(() => {
    const socket = io();

    // Handle socket events
    socket.on('new booking', (booking) => {
     // console.log('Received new booking:', booking);
      // Update your React state or perform any necessary actions with the new booking data
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};

export default WebSocket;
