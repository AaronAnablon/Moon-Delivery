import axios from "axios";
import { url, setHeaders } from "../../slices/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

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
  
  const currency = (price) => {
    return price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })
   }

  return (
    <div>
      <h2>User booking</h2>
      {loading && <p>Loading...</p>}
      {!loading && booked.length === 0 && <p>No bookings found</p>} 
      {!loading && booked &&
        booked.map((booking) => (
          <div className="mb-1" key={booking._id}>
          <Card>
            <Card.Body>
            <Card.Text className="border-bottom">
                Date Booked: {new Date(booking.createdAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  timeZoneName: 'short',
                })}
              </Card.Text>
              <Card.Title >Booking Details</Card.Title>
              <div className="row border-bottom">
                <div className="col-6">
                  <Card.Text >Service: <span>{booking.booking.service}</span></Card.Text>
                  <Card.Text>Client Name: <span>{booking.user.name}</span></Card.Text>
                </div>
              <div className="col-6">
                <Card.Text>Rider: <span>{booking.booking.booking.rider}</span></Card.Text>
                <Card.Text>Status: <span>{booking.booking.booking.status}</span></Card.Text>
                </div>
              </div>
              <div className="row border-bottom">
              <div className="col-6">
              <Card.Text>Destination: <span>{booking.booking.booking.address.destination}</span></Card.Text>
              </div>
              <div className="col-6">
                <Card.Text>
                {booking.booking.service === 'Pabili' ? 'Store Address: ' : 'Pick Up Address: '}
                  <span>{booking.booking.booking.address.pickUpAdress}</span>
                </Card.Text>           
                </div>
                </div>
              {booking.booking.item && (
                <div>
                  <Card.Text>Item: <span>{booking.booking.item}</span></Card.Text>
                  <Card.Text>Details: <span>{booking.booking.itemDetails}</span></Card.Text>
                </div>
               
              )}
              {booking.booking.items && (
                <div>
                  <ListGroup variant="flush">
                  <ListGroup.Item style={{display: 'flex', justifyContent: 'space-between', padding: '0.5rem' }}>
                    <div>Item</div>
                    <div>Store</div>
                    <div>Address</div>
                  </ListGroup.Item>
                    {booking.booking.items.map((item, index) => (
                      <>
              <ListGroup.Item key={index} style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', padding: '0.5rem' }}>
                    <span>{index + 1}. {item.item}</span>
                    <span>{item.store}</span>
                    <span>{item.address}</span>
                  </ListGroup.Item></>
                    ))}
                  </ListGroup>
                </div>
              )}
              <Card.Text>Fare: <span> {currency(booking.booking.booking.totalAmount)}</span></Card.Text>
              {booking.booking.booking.status === 'For Pick Up' ? (
                <Button className="m-3" variant="primary" onClick={() => handleCallRider(booking.booking.booking.riderPhone)}>
                  Call Rider
                </Button>
              ) : (
                <Button className="m-3" variant="danger" onClick={() => handleCancel(booking)}>
                  Cancel
                </Button>
              )}
            </Card.Body>
          </Card>
        </div>
        ))}
    </div>
  );
};

export default UserBooking;
