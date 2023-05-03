import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";

const PickUpClient = () => {
  const auth = useSelector((state) => state.auth);
  const [booked, setBooked] = useState([]);

  
  const getBooking = () => {axios
     .get(`${url}/booking/${auth._id}/For Pick Up`, setHeaders)
       .then((response) => {
      setBooked(response.data);
    })
    .catch((error) => {
        console.log(error);
    });}
  

    useEffect(() => {
      const intervalId = setInterval(() => {
        getBooking();
      }, 3000); // call getBooking every 5 seconds
      return () => clearInterval(intervalId); // cleanup function to clear the interval when component unmounts
    }, []);
  
    
    const handleCompleted = async (booking) => {
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
                status: 'Completed',
                riderDelete: booking.booking.booking.riderDelete,
                userDelete: booking.booking.booking.userDelete,
                riderId: auth._id,
                rider: auth.name,
              }, service: booking.booking.service,
            completedAt: Date.now()}
          };
          await axios.put(`${url}/booking/${booking._id}`, updatedBooking, setHeaders()).then((response) => {
            console.log(response.data)
            getBooking()
          });
        } catch (err) {
          console.log(err);
        }
      };

 

  return (
    <div>
      <h2>Pick Up Client</h2>
          <ul>
            {booked &&
        booked.map((booking) => (
          <div style={{ borderBottom: '1px solid black', marginBottom: '1px' }} key={booking._id}>
             <p>Date Booked: {booking.createdAt}</p> 
            <p>Client Name: {booking.user.name}</p>
            <a style={{ all: 'unset' }} href={booking.booking.booking.phoneNumber}>
              Client Phone Number: 📞🟢{booking.booking.booking.phoneNumber}</a>
            <p>Destination: {booking.booking.booking.address.destination}</p>  
            <p>Pick Up Address: {booking.booking.booking.address.pickUpAdress}</p> 
            <p>Fare: {booking.booking.booking.totalAmount}</p> 
            <p>Rider: {booking.booking.booking.rider}</p> 
            <p>Rider Phone Number: {booking.booking.booking.riderPhone}</p>
            <p>Status: {booking.booking.booking.status}</p> 
            <button onClick={() => handleCompleted(booking)}>Completed</button>
          </div>
        ))}
     
      </ul>
    </div>
  );
};

export default PickUpClient;
