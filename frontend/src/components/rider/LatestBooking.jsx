import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5000");

const LatestBooking = () => {
  useEffect(() => {
    socket.on('new booking', (booking) => {
      console.log('Received new booking:', booking);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

};

export default LatestBooking;
