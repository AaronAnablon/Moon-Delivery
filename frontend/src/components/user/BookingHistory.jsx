  import { url, setHeaders } from "../../slices/api";
  import { useState, useEffect } from "react";
  import { useSelector } from "react-redux";
  import axios from "axios";
  
  const BookingHistory = () => {
    const [booked, setBooked] = useState([]);
    const auth = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false);

    const getBooking = () => {
      setLoading(true); // Set loading to true before the axios call
      axios.get(`${url}/booking/user/${auth._id}/Completed`, setHeaders)
        .then((response) => {
          setBooked(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after the axios call
        });
    };
  
    useEffect(() => {
      getBooking()
    }, []);
  
    const handleDelete = async (booking) => {
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
              riderPhone: booking.booking.booking.riderPhone,
              status: booking.booking.booking.status,
              riderDelete: booking.booking.booking.riderDelete,
              userDelete: true,
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
        <h2>Booking History</h2>
        {loading && <p>Loading...</p>}
        {booked &&
          booked.map((booking) => (
            <div style={{ borderBottom: '1px solid black', marginBottom: '1px' }} key={booking._id}>
               <p>Date Booked: {new Date(booking.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short',
              })}</p> 
               <p>Date Completed: {new Date(booking.booking.completedAt).toLocaleString('en-US', {
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
              {booking.booking.booking.status === 'For Pick Up' ? 
  <button onClick={() => handleCallRider(booking.booking.booking.riderPhone)}>Call Rider</button> :
  booking.booking.booking.status === 'Completed' ?  <button onClick={() => handleDelete(booking)}>Delete</button> :
 null
}         


         
            
            </div>
          ))}
      </div>
    );
  };
  
  export default BookingHistory;
  