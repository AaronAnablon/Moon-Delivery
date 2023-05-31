import axios from "axios";
import { url, setHeaders } from "../../slices/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import sendMail from "../notification/sendMail";
import io from 'socket.io-client';
import { server } from "../../slices/api";

const Booked = () => {
  const [booked, setBooked] = useState([]);
  const auth = useSelector(state => state.auth)
  const [loading, setLoading] = useState(false)
  const [newBooking, setNewBooking] = useState('')

  useEffect(() => {
    const socket = io.connect(server);
    socket.on('booking', (booking) => {
      console.log('Received new booking:', booking);
      setNewBooking(booking)
    });
    return () => {
      socket.disconnect();
    };
  }, []);


  const getBooking = () => {
    setLoading(true);
    axios.get(`${url}/booking/booked`, setHeaders)
      .then((response) => {
        setBooked((response.data).reverse());
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getBooking();
  }, [newBooking]);

const handlePickUp = async (booking) => {
  try {
    const updatedBooking = {
      motorcycle: 'Honda Click',
      booking: {
        booking: {
          address:
          {
            pickUpAdress: booking.booking.booking.address.pickUpAdress,
            destination: booking.booking.booking.address.destination,
          },
          totalAmount: booking.booking.booking.totalAmount,
          phoneNumber: booking.booking.booking.phoneNumber,
          riderPhone: auth.phoneNumber,
          status: 'For Pick Up',
          riderDelete: booking.booking.booking.riderDelete,
          userDelete: booking.booking.booking.userDelete,
          active: true,
          riderId: auth._id,
          rider: auth.name,
        }, items: booking.booking.items,
        item: booking.booking.item,
        itemDetails: booking.booking.itemDetails,
        service: booking.booking.service
      },

    };

    const sendNotif = async () => {
      try {
        const response = await axios.post(`${url}/notification`, {
          user: booking.user._id,
          email: 'sent',
          notification: `Good day, This is Moon Delivery. Rider ${auth.name} will be coming to pick you. Please prepare`,
          payLoad: {read: false, service: booking.booking.service},
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
    }};

    const recipientEmail = booking.user.email;
    const subject = 'Rider is ready to pick you up';
    const text = `Good day, This is Moon Delivery. Rider ${auth.name} will be coming to pick you. Please prepare.
    Please open your Moon Delivery Web Application here https://example.com/tracking`;

    await axios.put(`${url}/booking/${booking._id}`, updatedBooking, setHeaders()).then((response) => {
      console.log(response.data)
      const socket = io.connect(server);
      socket.emit('notification', response.data);
      sendNotif(booking.user._id)
      sendMail({ recipientEmail, subject, text })
      getBooking()
    });
  } catch (err) {
    console.log(err);
  }
};

const formatDate = (date) =>{
  return( new Date(date).toLocaleString('en-US', {
 year: 'numeric',
 month: '2-digit',
 day: '2-digit',
 hour: '2-digit',
 minute: '2-digit',
 second: '2-digit',
 timeZoneName: 'short',
}))
}

return (
  <div>
    <h2>Booked</h2>
    {loading && <p>Loading...</p>}
    {booked && booked.length === 0 && <p>No booking found</p>}
    {booked &&
      booked.map((booking) => (
        <div style={{ borderBottom: '1px solid black', marginBottom: '1px' }} key={booking._id}>
          <p>Service: {booking.booking.service}</p>
          <p>Date Booked: {formatDate(booking.createdAt)}</p>
          <p>Client Name: {booking.user.name}</p>
          <p>Destination: {booking.booking.booking.address.destination}</p>
          <p>Pick Up Address: {booking.booking.booking.address.pickUpAdress}</p>
          <p>Fare: {booking.booking.booking.totalAmount}</p>
          <p>Status: {booking.booking.booking.status}</p>
          <button onClick={() => handlePickUp(booking)}>Accept Booking</button>
        </div>
      ))}
  </div>
);
};

export default Booked;
