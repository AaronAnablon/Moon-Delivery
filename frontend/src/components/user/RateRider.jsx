import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import DateFormat from "../formatters/DateFormat";
import CurrencyFormat from "../formatters/CurrencyFormat";
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
  FcDiploma2,
  FcRating
} from "react-icons/fc";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { toast } from "react-toastify";
import Loading from "../Loading";


const RateRider = () => {
  const auth = useSelector((state) => state.auth);
  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState("");

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [hiddenStates, setHiddenStates] = useState([]);

  const toggleHiddenComponent = (index) => {
    setHiddenStates((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };


  const handleRating = (value) => {
    setRating(value);
  };
  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const getBooking = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/booking/user/Arrived/${auth._id}`, setHeaders());
      setBooked((response.data).reverse());
      setLoading(false);
    } catch (error) {
      //console.error(error);
      toast.error('Something went wrong!')
    }
  };


  useEffect(() => {
    getBooking()
  }, []);
  const handleCompleted = async (booking) => {
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
            status: 'Completed',
            riderDelete: booking.booking.booking.riderDelete,
            userDelete: booking.booking.booking.userDelete,
            riderId: booking.booking.booking.riderId,
            rider: booking.booking.booking.rider,
          }, item: booking.booking.item,
          itemDetails: booking.booking.itemDetails,
          service: booking.booking.service,
          completedAt: booking.booking.completedAt,
        }
      };
      await axios.put(`${url}/booking/${booking._id}`, updatedBooking, setHeaders())
        .then((response) => {
          //console.log(response.data)
          getBooking()
        });
    } catch (err) {
      //console.log(err);
      toast.error('Something went wrong!')
    }
  };

  const submitRating = async (RiderId, booking) => {
    try {
      const response = await axios.put(`${url}/user/Rider/${RiderId}`, { rating, comment: [comment, auth.name, rating] }, setHeaders());
      //console.log(response.data);
      handleCompleted(booking)
      getBooking()
      setHover('')
      setComment('')
      setHiddenStates('')
      toast.success('Successfully Submited!')
    } catch (error) {
      //console.error(error);
      toast.error('Something went wrong!')
    }
  };

  return (
    <div>
      <h2>Booked</h2>
      {!loading && booked.length === 0 && <><p>No bookings found  </p>
        <Link to="/booking/pabili">
          <FaArrowAltCircleLeft />
          <span>Book a Ride</span>
        </Link></>}
      {loading && <Loading />}
      {booked &&
        booked.map((booking, index) => (
          <Card className="shadow mb-2 p-3" key={booking._id}>
            <div key={index}><FcCalendar size={28} /> Date Booked: <span>{DateFormat(booking.createdAt)}</span></div>
            <div><FcCalendar size={28} /> Date Completed: <span>{DateFormat(booking.booking.completedAt)}</span></div>
            <div className="row border-bottom border-top">
              <div className="col-6 ">
                <Card.Text><FcServices size={28} /> Service: <span>{booking.booking.service}</span></Card.Text>
                <Card.Text><FcTodoList size={28} /> Status: <span>{booking.booking.booking.status}</span></Card.Text>
              </div>
              <div className="col-6">
                <Card.Text><GiFullMotorcycleHelmet size={28} /> Rider: <span>{booking.booking.booking.rider}</span></Card.Text>
                <Card.Text><FcDiploma2 size={28} /> RiderId: <span>{booking.booking.booking.riderId}</span></Card.Text>
                <Card.Text><FcNightPortrait size={28} /> Client Name: <span>{booking.user.name}</span></Card.Text>
              </div>  
              {hiddenStates[index] &&
                <div className="row border-top border-bottom">
                  <div className="col-12 d-flex">
                    <div className="col-6 mt-2">
                      {rating
                        ? `You rated: ${rating} stars`
                        : "Rate this product:"}
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
                  <div className="col-12 mt-2">
                    <textarea placeholder="Add a comment:" type="text" id="comment" value={comment} onChange={handleComment} />
                  </div>
                  <div className="row justify-content-evenly border-bottom">
                    <Button className="col-lg-3 col-6 mt-2 mb-2" onClick={() => submitRating(booking.booking.booking.riderId, booking)}>Submit Rating</Button>
                  </div>
                </div>
               }
                <div className="col-6 m-3 ">
                  <Button onClick={() => toggleHiddenComponent(index)}>
                    <FcRating size={22} /> {hiddenStates[index] ? <>Cancel</> : <>Rate Rider</>}</Button>
                </div>
           
            </div>
            <div className="row border-bottom">
              <div className="col-6">
                <Card.Text><FcPodiumWithSpeaker size={28} /> Pick Up Address: <span>{booking.booking.booking.address.pickUpAdress}</span></Card.Text>
              </div>
              <div className="col-6">
                <Card.Text><FcPortraitMode size={28} /> Destination: <span>{booking.booking.booking.address.destination}</span></Card.Text>
              </div>
            </div>
            {booking.booking.item ? <div><p><FcDeployment size={28} />Item: {booking.booking.item}</p>
              <p><FcViewDetails size={28} />Details: {booking.booking.itemDetails}</p></div> : null}
            {booking.booking.items ? (<div>
              <ListGroup variant="flush">
                <ListGroup.Item style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem' }}>
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
            <Card.Text><FcMoneyTransfer size={28} />Fare: <span>{CurrencyFormat(booking.booking.booking.totalAmount)}</span></Card.Text>
          </Card>
        ))}
    </div>
  );
};

export default RateRider;
