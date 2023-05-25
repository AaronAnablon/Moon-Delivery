import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import sendMail from "../notification/sendMail";
import io from 'socket.io-client';
import { server } from "../../slices/api";

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
         payLoad: {read: false},
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
    }};
  

    const handleCompleted = async (booking) => {
      const recipientEmail = booking.user.email;
      const subject = 'Rider is ready to pick you up';
      const text = `Good day ${booking.user.name}, This is Moon Delivery. 
      You successfully arrived at the destination. Please rate how was the rider's service.
       Click here to rate rider http://localhost:3000/user/rateRider`;
        try {
          const updatedBooking = {
            booking:{
              booking: { 
                address:
                {pickUpAdress: booking.booking.booking.address.pickUpAdress,
                destination: booking.booking.booking.address.destination,},
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
            completedAt: Date.now()}
          };
          await axios.put(`${url}/booking/${booking._id}`, updatedBooking, setHeaders()).then((response) => {
            console.log(response.data)
            const socket = io.connect(server);
            socket.emit('notification', response.data);
            sendMail({recipientEmail, subject, text})
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

  return (
    <div>
      <h2>Pick Up Booked</h2>
      {loading && <p>Loading...</p>}
          <ul>
            {booked &&
        booked.map((booking) => (
          <div style={{ borderBottom: '1px solid black', marginBottom: '1px' }} key={booking._id}>
                  <p>Service: {booking.booking.service}</p> 
                  <p>Date Booked: {new Date(booking.createdAt).toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              timeZoneName: 'short',
            })}</p> 
            <p>Client Name: {booking.user.name}</p>
            <p onClick={() => handleCallClient(booking.booking.booking.phoneNumber)}>
              Client Phone Number: 📞🟢{booking.booking.booking.phoneNumber}</p>
            <p>Destination: {booking.booking.booking.address.destination}</p>  
            <p>Pick Up Address: {booking.booking.booking.address.pickUpAdress}</p> 
            <p>Fare: {booking.booking.booking.totalAmount}</p> 
            <p>Rider: {booking.booking.booking.rider}</p> 
            <p>Status: {booking.booking.booking.status}</p> 
            {booking.booking.item ? <div><p>Item: {booking.booking.item}</p>
            <p>Details: {booking.booking.itemDetails}</p></div>  : null}

            {booking.booking.items ? (<div>Items: {booking.booking.items.map((item) => 
            <ul><li>{item.item} - {item.store} </li></ul>)}
              <p>Fare: {booking.booking.items.slice(-1)[0].Fare}</p>
            </div>) : null}

            <button onClick={() => handleCompleted(booking)}>Completed</button>
          </div>
        ))}
     
      </ul>
    </div>
  );
};

export default PickUpClient;
