import axios from "axios";
import { url, setHeaders } from "../../slices/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import sendMail from "../notification/sendMail";
import io from 'socket.io-client';
import { server } from "../../slices/api";
import { Button, Card } from "react-bootstrap";
import {
  FcCalendar,
  FcServices,
  FcTodoList,
  FcPortraitMode,
  FcMoneyTransfer,
  FcGlobe,
  FcAssistant
} from "react-icons/fc";

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
            notification: `Good day, This is Moon Delivery. Rider ${auth.name} is ready for Pick up. Please prepare`,
            payLoad: { read: false, service: booking.booking.service },
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      const recipientEmail = booking.user.email;
      const subject = 'Rider is ready to pick up';
      const text = `Good day, This is Moon Delivery. Rider ${auth.name} will be coming to pick you. Please prepare.
    Please open your Moon Delivery Web Application here https://example.com/tracking`;

      await axios.put(`${url}/booking/${booking._id}`, updatedBooking, setHeaders())
        .then((response) => {
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

  const formatDate = (date) => {
    return (new Date(date).toLocaleString('en-US', {
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
          <div className="border-bottom p-3 rounded mb-2 shadow" key={booking._id}>
            <div className="d-md-flex border-bottom">
              <Card.Text className="col-12 col-md-6"><FcServices size={28} /> Service: <span>{booking.booking.service}</span></Card.Text>
              <Card.Text className="col-12 col-md-6"><FcCalendar size={28} /> Date Booked: <span>{formatDate(booking.createdAt)}</span></Card.Text>
            </div>
            <Card.Text className="mt-3"><FcPortraitMode size={28} /> Client Name: <span>{booking.user.name}</span></Card.Text>
            <div className="d-flex border-bottom">
            <Card.Text className="col-6"><FcGlobe size={28} /> Destination: <span>{booking.booking.booking.address.destination}</span></Card.Text>
            <Card.Text className="col-6"><FcAssistant size={28} /> Pick Up Address: <span>{booking.booking.booking.address.pickUpAdress}</span></Card.Text>
          </div>
          <div className="d-flex mt-3">
            <Card.Text className="col-6"><FcMoneyTransfer size={28} /> Fare: <span>{booking.booking.booking.totalAmount}</span></Card.Text>
            <Card.Text className="col-6"><FcTodoList size={28} /> Status: <span>{booking.booking.booking.status}</span></Card.Text>
           </div>
            <Button onClick={() => handlePickUp(booking)}>Accept Booking</Button>
          </div>
        ))}
    </div>
  );
};

export default Booked;
