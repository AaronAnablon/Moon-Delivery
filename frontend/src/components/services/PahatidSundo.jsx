import React, { useState } from 'react';
import DistanceCalculator from '../booking/DistanceCalculator';
import { useSelector } from 'react-redux';
import { setHeaders, url } from "../../slices/api";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import {server} from '../../slices/api'

const PahatidSundo = () => {
    const booking = useSelector(state => state.booking)
    const auth = useSelector(state => state.auth)

  const [pickupAddress, setPickupAddress] = useState('');
  const [destination, setDestination] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [defaultNumber, setDefaultNumber] = useState(false);

  const navigate = useNavigate()

  const handlePickupAddressChange = (event) => {
    setPickupAddress(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleUseDefaultAddress = () => {
      setDefaultAddress(!defaultAddress)
  }

  const handleUseDefaultNumber = () => {
      setDefaultNumber(!defaultNumber)
  }

  const booked = {
    user: {_id: auth._id, name: auth.name, email: auth.email} ,
    motorcycle: '',
    booking: {booking, service: 'PahatidSundo'},
  };
  const handleSubmitBooking = () => {
    axios.post(`${url}/booking`, booked, setHeaders())
    .then(response => {
      console.log('success', response.data);
      toast.success('Booked successfully!');
      const socket = io.connect(server);
      socket.emit('booking', response.data);
      navigate('/user/userBooking');
    })
    .catch(error => {
      toast.error('Something went wrong!');
      console.log(error);
    });
  }
  
  
  return (
    <div>
    <h2>Pahatid/Sundo</h2>   
      <Card className="m-3 shadow p-3">
      <h2>Book a Ride</h2>
        <Form>
          <Form.Group controlId="pickupAddress">
            <Form.Label>Pickup Address:</Form.Label>
            <Form.Control type="text" value={defaultAddress ? auth.address : pickupAddress} onChange={handlePickupAddressChange} />
          </Form.Group>
          <Form.Group controlId="useDefaultAddress">
            <Form.Check
              type="checkbox"
              onChange={handleUseDefaultAddress}
              label="Use Default Address"
            />
          </Form.Group>
          <Form.Group controlId="destination">
            <Form.Label>Destination:</Form.Label>
            <Form.Control type="text" value={destination} onChange={handleDestinationChange} />
          </Form.Group>
          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control type="text" value={defaultNumber ? auth.phoneNumber : phoneNumber} onChange={handlePhoneNumberChange} />
          </Form.Group>
          <Form.Group controlId="useDefaultPhoneNumber">
            <Form.Check
              type="checkbox"
              onChange={handleUseDefaultNumber}
              label="Use Default Phone Number"
            />
          </Form.Group>
          <DistanceCalculator
            pickupAddress={pickupAddress}
            destination={destination}
            phoneNumber={phoneNumber}
            handleSubmitBooking={handleSubmitBooking}
          />
          {booking.totalAmount && 
          <Button className='col-12' variant="primary" onClick={handleSubmitBooking}>
            Submit Booking
          </Button>}
        </Form>
      </Card>
  </div>
  );
};

export default PahatidSundo;
