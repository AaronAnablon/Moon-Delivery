import axios from "axios";
import { url, setHeaders } from "../../slices/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const UserBooking = () => {
  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(false)
  const auth = useSelector(state => state.auth)

  const getBooking = () => {
    setLoading(true)
    axios.get(`${url}/booking/user/${auth._id}/booked`, setHeaders)
  .then((response) => {
    setBooked(response.data);
       })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    setLoading(false); 
  });;}

  useEffect(() => {
          getBooking()
     }, []);

  const handleCancel = async (booking) => {
    try {
      const updatedBooking = {
        booking:{
          booking: { 
            address:
            {pickUpAdress: booking.booking.booking.address.pickUpAdress,
            destination: booking.booking.booking.address.destination,},
            totalAmount: booking.booking.booking.totalAmount,
            phoneNumber: booking.booking.booking.phoneNumber,
            riderPhone: booking.booking.booking.riderPhone,
            status: 'Cancelled',
            riderDelete: booking.booking.booking.riderDelete,
            userDelete: booking.booking.booking.userDelete,
            riderId: booking.booking.booking.riderId,
            rider: booking.booking.booking.name,
          }, service: booking.booking.service}
      };
      await axios.put(`${url}/booking/${booking._id}`, updatedBooking, setHeaders()).then((response) => {
        console.log(response.data)
        getBooking()
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleCallRider = (riderNumber) => {
    window.open(`tel:${riderNumber}`);
  }
  
 

  return (
    <div>
      <h2>User booking</h2>
      {loading && <p>Loading...</p>}
      {!loading && booked.length === 0 && <p>No bookings found</p>} 
      {!loading && booked &&
        booked.map((booking) => (
          <div style={{ borderBottom: '1px solid black', marginBottom: '1px' }} key={booking._id}>
              <p>Details: {booking.booking.service}</p> 
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
            <p>Rider: {booking.booking.booking.rider}</p> 
            <p>Status: {booking.booking.booking.status}</p> 
            <p>Item: {booking.booking.item}</p> 
            <p>Details: {booking.booking.itemDetails}</p> 
            <p>Service: {booking.booking.service}</p> 
            {booking.booking.booking.status === 'For Pick Up' ? 
  <button onClick={() => handleCallRider(booking.booking.booking.riderPhone)}>Call Rider</button> :
  <button onClick={() => handleCancel(booking)}>Cancel</button>
}         
          </div>
        ))}
    </div>
  );
};

export default UserBooking;
