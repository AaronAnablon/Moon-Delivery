import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import sendMail from "../notification/sendMail";
import io from 'socket.io-client';
import { server } from "../../slices/api";
import {
  FcCalendar,
  FcServices,
  FcTodoList,
  FcInTransit,
  FcNightPortrait,
  FcPodiumWithSpeaker,
  FcPortraitMode,
  FcMoneyTransfer,
  FcDeployment,
  FcViewDetails,
  FcShop,
  FcGlobe,
  FcAssistant
} from "react-icons/fc";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { Button, Card } from "react-bootstrap";

const PickUpClient = () => {
  const auth = useSelector((state) => state.auth);
  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(false)

  const getBooking = () => {
    setLoading(!loading)
    axios.get(`${url}/booking/${auth._id}/For Pick Up`, setHeaders)
      .then((response) => {
        setBooked((response.data).reverse());
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(loading)
      })
  }

  useEffect(() => {
    getBooking();
    console.log(booked)
  }, []);

  const sendNotif = async (bookerId) => {
    try {
      const response = await axios.post(`${url}/notification`, {
        user: bookerId,
        email: 'sent',
        notification: `Good day, This is Moon Delivery. 
          Successfully arrived at the destination. Please rate how was the rider's service.
           Click here to rate rider http://localhost:3000/user/rateRider`,
        payLoad: { read: false },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleCompleted = async (booking) => {
    const recipientEmail = booking.user.email;
    const subject = 'Rider is ready to pick you up';
    const text = `Good day ${booking.user.name}, This is Moon Delivery. 
      You successfully arrived at the destination. Please rate how was the rider's service.
       Click here to rate rider http://localhost:3000/user/rateRider`;
    try {
      const updatedBooking = {
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
            status: 'Arrived',
            riderDelete: booking.booking.booking.riderDelete,
            userDelete: booking.booking.booking.userDelete,
            active: true,
            riderId: auth._id,
            rider: auth.name,
          }, items: booking.booking.items,
          item: booking.booking.item,
          itemDetails: booking.booking.itemDetails,
          service: booking.booking.service,
          completedAt: Date.now()
        }
      };
      await axios.put(`${url}/booking/${booking._id}`, updatedBooking, setHeaders()).then((response) => {
        console.log(response.data)
        const socket = io.connect(server);
        socket.emit('notification', response.data);
        sendMail({ recipientEmail, subject, text })
        sendNotif(booking.user._id)
        getBooking()
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCallClient = (ClientNumber) => {
    window.open(`tel:${ClientNumber}`);
  }

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
    <div className="shadow">
      <h2>Pick Up Booked</h2>
      {booked && booked.length === 0 && <p>No booking found</p>}
      {loading && <p>Loading...</p>}

      {booked &&
        booked.map((booking) => (
          <div className="border-bottom mb-3 shadow p-3 rounded" key={booking._id}>
            <div className="d-md-flex border-bottom">
              <Card.Text className="col-12 col-md-6"><FcServices size={28} /> Service: <span>{booking.booking.service}</span></Card.Text>
              <Card.Text className="col-12 col-md-6"><FcCalendar size={28} /> Date Booked: <span>{formatDate(booking.createdAt)}</span></Card.Text>
            </div>
            <div className="d-md-flex border-bottom mt-3">
              <Card.Text className="col-12 col-md-6"><FcPortraitMode size={28} /> Client Name: <span>{booking.user.name}</span></Card.Text>
              <Card.Text className="col-12 col-md-6" onClick={() => handleCallClient(booking.booking.booking.phoneNumber)}>
                📞 Client Phone Number: <span>📞🟢{booking.booking.booking.phoneNumber}</span></Card.Text>
            </div>
            <div className="d-md-flex border-bottom">
              <Card.Text className="col-12 col-md-6"><FcGlobe size={28} /> Destination: <span>{booking.booking.booking.address.destination}</span></Card.Text>
              <Card.Text className="col-12 col-md-6"><FcAssistant size={28} /> Pick Up Address: <span>{booking.booking.booking.address.pickUpAdress}</span></Card.Text>
            </div>
            <div className="d-md-flex border-bottom">
              <Card.Text className="col-12 col-md-6"><FcTodoList size={28} /> Status: <span>{booking.booking.booking.status}</span></Card.Text>
              <Card.Text className="col-12 col-md-6"><GiFullMotorcycleHelmet size={28} /> Rider: <span>{booking.booking.booking.rider}</span></Card.Text>
            </div>
            <div className="d-md-flex border-bottom">
            {booking.booking.item && <div><Card.Text><FcServices size={28} /> Item: <span>{booking.booking.item}</span></Card.Text>
              <Card.Text><FcViewDetails size={28} /> Details: <span>{booking.booking.itemDetails}</span></Card.Text></div>}
            {booking.booking.items && <div><FcViewDetails size={28} /> Items: {booking.booking.items.map((item) =>
              <ul><li><span>{item.item} - {item.store}</span></li></ul>)}
              <Card.Text><FcMoneyTransfer size={28} /> Fare: <span>{booking.booking.items.slice(-1)[0].Fare}</span></Card.Text>
            </div>}
           </div>
           {!booking.booking.items && <Card.Text className="mt-3"><FcMoneyTransfer size={28} /> Fare: <span>{booking.booking.booking.totalAmount}</span></Card.Text>}
            <Button onClick={() => handleCompleted(booking)}>Completed</Button>
          </div>
        ))}
    </div>
  );
};

export default PickUpClient;
