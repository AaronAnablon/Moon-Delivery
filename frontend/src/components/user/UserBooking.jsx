import axios from "axios";
import { url, setHeaders } from "../../slices/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { 
  FcCalendar,
  FcServices, 
  FcTodoList, 
  FcInTransit,
  FcNightPortrait,
  FcPortraitMode,
  FcMoneyTransfer,
  FcDeployment,
  FcViewDetails,
  FcGlobe,
  FcAssistant
} from "react-icons/fc";
import { GiFullMotorcycleHelmet } from "react-icons/gi";

const UserBooking = () => {
  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(false)
  const auth = useSelector(state => state.auth)

  const getBooking = () => {
    setLoading(true)
    axios.get(`${url}/booking/user/${auth._id}/booked`, setHeaders)
  .then((response) => {
    setBooked((response.data).reverse());
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
      <h2>Booked</h2>
      {loading && <p>Loading...</p>}
      {!loading && booked.length === 0 && <><p>No bookings found  
           </p>  <Link to="/booking/pabili">
              <FaArrowAltCircleLeft />
              <span>Book a Ride</span>
            </Link></>} 
      {!loading && booked &&
        booked.map((booking) => (
          <div className="mb-1" key={booking._id}>
          <Card>
            <Card.Body>
            <Card.Text className="border-bottom">
                <FcCalendar size={28} /> Date Booked: {new Date(booking.createdAt).toLocaleString('en-US', {
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
                  <Card.Text ><FcServices size={28}/> Service: <span>{booking.booking.service}</span></Card.Text>
                  <Card.Text><FcTodoList size={28}/> Status: <span>{booking.booking.booking.status}</span></Card.Text>
                </div>
              <div className="col-6">
                <Card.Text><GiFullMotorcycleHelmet size={28}/> Rider: <span>{booking.booking.booking.rider}</span></Card.Text>
                 <Card.Text><FcNightPortrait size={28}/> Client Name: <span>{booking.user.name}</span></Card.Text>
                </div>
              </div>
              <div className="row border-bottom">
              <div className="col-6 mb-3 mt-3">
              <Card.Text><FcGlobe size={28}/> Destination: <span>{booking.booking.booking.address.destination}</span></Card.Text>
              </div>
              <div className="col-6 mb-3 mt-3">
                <Card.Text><FcPortraitMode size={28}/>
                {booking.booking.service === 'Pabili' ? 'Store Address: ' : 'Pick Up Address: '}
                  <span>{booking.booking.booking.address.pickUpAdress}</span>
                </Card.Text>           
                </div>
                </div>
              {booking.booking.item && (
                <div>
                  <Card.Text><FcDeployment size={28}/> Item: <span>{booking.booking.item}</span></Card.Text>
                  <Card.Text><FcViewDetails size={28}/> Details: <span>{booking.booking.itemDetails}</span></Card.Text>
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
              <ListGroup.Item key={index + 1} style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', padding: '0.5rem' }}>
                    <span>{index + 1}. {item.item}</span>
                    <span>{item.store}</span>
                    <span>{item.address}</span>
                  </ListGroup.Item></>
                    ))}
                  </ListGroup>
                </div>
              )}
              <div className="col-12 m-3 d-flex justify-content-end">
              <Card.Text className="col-4"><FcMoneyTransfer size={28}/>Fare: <span> {currency(booking.booking.booking.totalAmount)}</span></Card.Text>
              </div>
              {booking.booking.booking.status === 'For Pick Up' ? (
                <Button className="m-3" variant="primary" onClick={() => handleCallRider(booking.booking.booking.riderPhone)}>
                  <FcAssistant size={28}/> Call Rider
                </Button>
              ) : (
                booking.booking.booking.status === 'Cancelled' ? null :
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
