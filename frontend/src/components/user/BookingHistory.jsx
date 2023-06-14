import { url, setHeaders } from "../../slices/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import {
  FcCalendar,
  FcServices,
  FcTodoList,
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

const BookingHistory = () => {
  const [booked, setBooked] = useState([]);
  const auth = useSelector(state => state.auth)
  const [loading, setLoading] = useState(false);

  const getBooking = () => {
    setLoading(true); // Set loading to true before the axios call
    axios.get(`${url}/booking/user/Completed/${auth._id}`, setHeaders())
      .then((response) => {
        setBooked((response.data).reverse());
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
        booking: {
          booking: {
            address:
            {
              pickUpAdress: booking.booking.booking.address.pickUpAdress,
              destination: booking.booking.booking.address.destination,
            },
            totalAmount: booking.booking.booking.totalAmount,
            phoneNumber: booking.booking.booking.phoneNumber,
            riderPhone: booking.booking.booking.riderPhone,
            status: booking.booking.booking.status,
            riderDelete: booking.booking.booking.riderDelete,
            userDelete: true,
            riderId: booking.booking.booking.riderId,
            rider: booking.booking.booking.name,
          }, item: booking.booking.item,
          itemDetails: booking.booking.itemDetails,
          service: booking.booking.service,
          completedAt: booking.booking.completedAt,
        }
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

  const currency = (price) => {
    return price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })
  }
  return (
    <div>
      <h2>Booking History</h2>
      {loading && <p>Loading...</p>}
      {!loading && booked.length === 0 && <><p>No history found
      </p>
        <Link to="/booking/pabili">
          <FaArrowAltCircleLeft />
          <span>Book a Ride</span>
        </Link></>}
      {booked &&
        booked.map((booking) => (
          <Card className="shadow mb-2 p-3" key={booking._id}>
            <Card.Text><FcCalendar size={28} /> Date Booked:  <span>{formatDate(booking.createdAt)}</span></Card.Text>
            <Card.Text><FcCalendar size={28} /> Date Completed: <span>{formatDate(booking.booking.completedAt)}</span></Card.Text>
            <div className="row border-bottom border-top">
              <div className="col-6 ">
                <Card.Text><FcServices size={28} /> Service: <span>{booking.booking.service}</span></Card.Text>
                <Card.Text><FcTodoList size={28} /> Status: <span>{booking.booking.booking.status}</span></Card.Text>
              </div>
              <div className="col-6 ">
                <Card.Text><GiFullMotorcycleHelmet size={28} /> Rider: <span>{booking.booking.booking.rider}</span></Card.Text>
                <Card.Text><FcNightPortrait size={28} /> Client Name: <span>{booking.user.name}</span></Card.Text>
              </div>
            </div>
            <div className="row border-bottom">
              <div className="col-6 mt-3 mb-3">
                <Card.Text><FcPodiumWithSpeaker size={28} /> Pick Up Address: <span>{booking.booking.booking.address.pickUpAdress}</span></Card.Text>
              </div>
              <div className="col-6 mb-3 mt-3">
                <Card.Text><FcPortraitMode size={28} /> Destination: <span>{booking.booking.booking.address.destination}</span></Card.Text>
              </div>
            </div>
            {booking.booking.item ? <div><p><FcDeployment size={28} />Item: {booking.booking.item}</p>
              <p><FcViewDetails size={28} /> Details: {booking.booking.itemDetails}</p></div> : null}
            {booking.booking.items ? (<div>
              <ListGroup variant="flush">
                <ListGroup.Item style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem' }}>
                  <div><FcDeployment size={28} /> Item</div>
                  <div><FcShop size={28} /> Store</div>
                  <div><FcGlobe size={28} /> Address</div>
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
            </div>) : null}
            <Card.Text><FcMoneyTransfer size={28} /> Fare: <span>{currency(booking.booking.booking.totalAmount)}</span></Card.Text>
            <div className="m-3">
              {booking.booking.booking.status === 'For Pick Up' ?
                <Button onClick={() => handleCallRider(booking.booking.booking.riderPhone)}><FcAssistant />Call Rider</Button> :
                booking.booking.booking.status === 'Completed' ? <Button variant="danger" onClick={() => handleDelete(booking)}>Delete</Button> :
                  null} </div>
          </Card>
        ))}
    </div>
  );
};

export default BookingHistory;
