import React, { useState } from 'react';
import DistanceCalculator from '../booking/DistanceCalculator';
import { useSelector } from 'react-redux';
import { setHeaders, url } from "../../slices/api";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const PakuhaPadala = () => {
    const booking = useSelector(state => state.booking)
    const auth = useSelector(state => state.auth)

  const [item, setItem] = useState('')
  const [itemDetails, setItemDetails] = useState('')
  const [pickupAddress, setPickupAddress] = useState('');
  const [destination, setDestination] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate()

  const handlePickupAddressChange = (event) => {
    setPickupAddress(event.target.value);
  };

  const handleItemDetailsChange = (e) => {
    setItemDetails(e.target.value);
  };

  const handleItemChange = (e) => {
    setItem(e.target.value)
  }

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const booked = {
    user: {_id: auth._id, name: auth.name} ,
    motorcycle: '',
    booking: {booking, item: item, itemDetails: itemDetails,  service: 'PakuhaPadala'},
  };

const handleSubmitBooking = () => {
  axios.post(`${url}/booking`, booked, setHeaders)
  .then(response => {
    console.log(response.data);
     toast('Booked successfully!');
     navigate('/user/userBooking');
   })
   .catch(error => {
     console.log(error);
   });
}
  
  return (
    <div>
      <h2>Pakuha/Padala</h2>
      <Form>
        <Form.Group controlId="item">
          <Form.Label>Item:</Form.Label>
          <Form.Control type="text" value={item} onChange={handleItemChange} />
        </Form.Group>
        <Form.Group controlId="itemDetails">
          <Form.Label>Item Details:</Form.Label>
          <Form.Control type="text" value={itemDetails} onChange={handleItemDetailsChange} />
        </Form.Group>
        <Form.Group controlId="pickupAddress">
          <Form.Label>Pickup Address:</Form.Label>
          <Form.Control type="text" value={pickupAddress} onChange={handlePickupAddressChange} />
        </Form.Group>
        <Form.Group controlId="destination">
          <Form.Label>Destination:</Form.Label>
          <Form.Control type="text" value={destination} onChange={handleDestinationChange} />
        </Form.Group>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
        </Form.Group>
        <DistanceCalculator pickupAddress={pickupAddress} destination={destination} phoneNumber={phoneNumber} handleSubmitBooking={handleSubmitBooking} />
        <Button className='col-12' variant="primary" onClick={handleSubmitBooking}>Submit Booking</Button>
      </Form>
    </div>
  );
};

export default PakuhaPadala;
