import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link }from 'react-router-dom'
import { FaArrowAltCircleLeft } from "react-icons/fa";

const RateRider = () => {
  const auth = useSelector((state) => state.auth);
  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState("");

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [selectedRiderId, setSelectedRiderId] = useState(null);
  const [comment, setComment] = useState("");
  
  const handleRating = (value) => {
    setRating(value);
  };
  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const getBooking = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/booking/user/Arrived/${auth._id}`, setHeaders);
      setBooked((response.data).reverse());
      setLoading(false);
    } catch (error) {
      console.error(error);
    } };

  useEffect(() => {
          getBooking()
     }, []);
     const handleCompleted = async (booking) => {
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
              status: 'Completed',
              riderDelete: booking.booking.booking.riderDelete,
              userDelete: booking.booking.booking.userDelete,
              riderId: booking.booking.booking.riderId,
              rider: booking.booking.booking.name,
            },  item: booking.booking.item,
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

  const submitRating = async (RiderId, booking) => {
        try {
          const response = await axios.put(`${url}/user/Rider/${RiderId}`, {rating, comment: [comment, auth.name, rating]}, setHeaders());
          console.log(response.data);
          handleCompleted(booking)
          getBooking()
        } catch (error) {
          console.error(error);
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

 const currency = (price) => {
  return price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })
 }
  return (
    <div>
      <h2>Booked</h2>
      {!loading && booked.length === 0 && <><p>No bookings found  
           </p>  <Link to="/booking/pabili">
              <FaArrowAltCircleLeft />
              <span>Book a Ride</span>
            </Link></>} 
      {loading && <div>Loading...</div>}
      <div>
{booked &&
  booked.map((booking) => (
    <div style={{ borderBottom: '1px solid black', marginBottom: '1px' }} key={booking._id}>
      <div>Date Booked: {formatDate(booking.createdAt)}</div> 
      <div>Date Completed: <span>{formatDate(booking.booking.completedAt)}</span></div> 
      <div className="row border-bottom border-top">
      <div className="col-6 ">
          <Card.Text>Service: <span>{booking.booking.service}</span></Card.Text> 
         <Card.Text>Status: <span>{booking.booking.booking.status}</span></Card.Text>
      </div>
      <div className="col-6 ">
        <Card.Text>Rider: <span>{booking.booking.booking.rider}</span></Card.Text>
        <Card.Text>RiderId: <span>{booking.booking.booking.riderId}</span></Card.Text>
        <Card.Text>Client Name: <span>{booking.user.name}</span></Card.Text>
      </div>
      <div className="row border-bottom">
      {selectedRiderId === booking.booking.booking.riderId ? (
              <div className="row border-top">
                <div className="col-6">
              <div>
                  {rating
                    ? `You rated: ${rating} stars`
                    : "Please rate this product"}
                </div>
              <div className="col-6 rating">
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => handleRating(ratingValue)}
                      />
                      <span
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      >
                        {ratingValue <= (hover || rating) ? "\u2605" : "\u2606"}
                      </span>
                    </label>
                  );
                })} 
              </div>  
              </div>
              <div className="col-6 mt-2">
                <textarea placeholder="Add a comment:" type="text" id="comment" value={comment} onChange={handleComment} />
                </div>
              <div className="row justify-content-evenly border-bottom">
              <Button className="col-3 m-2" onClick={() => submitRating(booking.booking.booking.riderId, booking)}>Submit Rating</Button>
              <Button className="col-3 m-2" onClick={() => setSelectedRiderId(!selectedRiderId)}>Cancel</Button>
              </div>
              </div>
            ) : (
              <div className="col-4 m-3 ">
              <Button onClick={() => setSelectedRiderId(booking.booking.booking.riderId)}>Rate</Button>
              </div>
            )}
      </div>
      </div>
      <div className="row border-bottom">
        <div className="col-6">
        <Card.Text>Pick Up Address: <span>{booking.booking.booking.address.pickUpAdress}</span></Card.Text> 
      </div>
      <div className="col-6">
      <Card.Text>Destination: <span>{booking.booking.booking.address.destination}</span></Card.Text> 
    </div>
      </div>
     {booking.booking.item ? <div><p>Item: {booking.booking.item}</p>
    <p>Details: {booking.booking.itemDetails}</p></div>  : null}
    {booking.booking.items ? (<div>
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
        </div>) : null}
        <Card.Text>Fare: <span>{currency(booking.booking.booking.totalAmount)}</span></Card.Text>       
    </div>
  ))}
      </div>
    </div>
  );
};

export default RateRider;
