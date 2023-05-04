import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";

const PickUpClient = () => {
  const auth = useSelector((state) => state.auth);
  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(false)
  
  const getBooking = () => {
    setLoading(!loading)
    axios.get(`${url}/booking/${auth._id}/For Pick Up`, setHeaders)
       .then((response) => {
      setBooked(response.data);
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
             <p>Date Booked: {booking.createdAt}</p> 
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
