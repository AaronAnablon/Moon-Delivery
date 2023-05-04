import axios from "axios";
import { url, setHeaders } from "../../slices/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Booked = () => {
  const [booked, setBooked] = useState([]);
  const auth = useSelector(state => state.auth)
  const [loading, setLoading] = useState(false)

  const getBooking = () => {
  setLoading(true);
  axios.get(`${url}/booking/booked`, setHeaders)
  .then((response) => {
    setBooked(response.data);
    })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    setLoading(false)
  })}

  useEffect(() => {
          getBooking();
     }, []);
  

  const handlePickUp = async (booking) => {
    try {
      const updatedBooking = {
        motorcycle: 'Honda Click',
        booking:{
        booking: { 
          address:
          {pickUpAdress: booking.booking.booking.address.pickUpAdress,
          destination: booking.booking.booking.address.destination,},
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
        service: booking.booking.service},
      
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
      <h2>Booked</h2>
        {loading && <p>Loading...</p>}
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
