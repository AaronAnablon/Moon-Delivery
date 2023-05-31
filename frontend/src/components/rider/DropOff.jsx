import React, { useState, useEffect } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";

const DropOff = () => {
  const auth = useSelector((state) => state.auth);
  const [booked, setBooked] = useState([]);

  
  const getBooking = () => {axios
     .get(`${url}/booking/${auth._id}/Completed`, setHeaders)
       .then((response) => {
      setBooked((response.data).reverse());
    })
    .catch((error) => {
        console.log(error);
    });}
  

    useEffect(() => {
      getBooking()
    }, []);
  
    
    const handleDelete = async (booking) => {
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
                status: booking.booking.booking.status,
                riderDelete: true,
                userDelete: booking.booking.booking.userDelete,
                active: true,
                riderId: auth._id,
                rider: auth.name,
              }, items: booking.booking.items, 
              item: booking.booking.item,
              itemDetails: booking.booking.itemDetails,
              service: booking.booking.service,
            completedAt: booking.booking.completedAt}
          };
          await axios.put(`${url}/booking/${booking._id}`, updatedBooking, setHeaders()).then((response) => {
            console.log(response.data)
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
      <h2>Pick Up Client</h2>
          <ul>
            {booked &&
        booked.map((booking) => (
          <div style={{ borderBottom: '1px solid black', marginBottom: '1px' }} key={booking._id}>
              <p>Service: {booking.booking.service}</p> 
             <p>Date Booked: {formatDate(booking.createdAt)}</p> 
            <p>Date Completed: {formatDate(booking.booking.completedAt)}</p>
            <p>Client Phone Number: {booking.booking.booking.phoneNumber}</p>
            <p>Destination: {booking.booking.booking.address.destination}</p>  
            <p>Pick Up Address: {booking.booking.booking.address.pickUpAdress}</p> 
            <p>Fare: {booking.booking.booking.totalAmount}</p> 
            <p>Status: {booking.booking.booking.status}</p> 
          
           <p>RiderDelete: {booking.booking.booking.riderDelete}</p>

            {booking.booking.item ? <div><p>Item: {booking.booking.item}</p>
            <p>Details: {booking.booking.itemDetails}</p></div>  : null}

            {booking.booking.items ? (<div>Items: {booking.booking.items.map((item, index) => 
            <ul><li key={index}>{item.item} - {item.store} </li></ul>)}
              <p>Fare: {booking.booking.items.slice(-1)[0].Fare}</p>
            </div>) : null}

            <button onClick={() => handleDelete(booking)}>Delete</button>
          </div>
        ))}
     
      </ul>
    </div>
  );
};

export default DropOff;
