import React, { useState } from 'react';
import DistanceCalculator from '../booking/DistanceCalculator';
import { useSelector } from 'react-redux';
import { setHeaders, url } from "../../slices/api";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import io from 'socket.io-client';
import { server } from '../../slices/api'
import { Link } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';
import PakuhaFlow from './PakuhaFlow';

const PakuhaPadala = () => {
  const booking = useSelector(state => state.booking)
  const auth = useSelector(state => state.auth)

  const [item, setItem] = useState('')
  const [itemDetails, setItemDetails] = useState('')
  const [pickupAddress, setPickupAddress] = useState('');
  const [destination, setDestination] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [defaultNumber, setDefaultNumber] = useState(false);

  const navigate = useNavigate()

  const handleUseDefaultAddress = () => {
    setDefaultAddress(!defaultAddress)
  }

  const handleUseDefaultNumber = () => {
    setDefaultNumber(!defaultNumber)
  }

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
    user: { _id: auth._id, name: auth.name, email: auth.email },
    motorcycle: '',
    booking: { booking, item: item, itemDetails: itemDetails, service: 'PakuhaPadala' },
  };

  const handleSubmitBooking = () => {
    axios
      .post(`${url}/booking`, booked, setHeaders)
      .then(response => {
        console.log('success', response.data);
        const socket = io.connect(server);
        socket.emit('booking', response.data);
        toast.success('Booked successfully!');
        navigate('/user/userBooking');
      })
      .catch(error => {
        toast.error('Something went wrong. Please try changing the address and other related input');
        console.log('Error:', error.response);
      });
  };

  return (
    <div className="container-fluid d-flex">
      <div className='col-md-6 d-md-block d-none mt-4'>
        <h2>How it works</h2>
        <PakuhaFlow />
      </div>
      <div className='col-md-6 col-12'>
        <Card className="m-3 shadow p-3">
        <Link to="/booking/services"><IoArrowBackCircle size={40} /></Link>
          <h2>Add items to pick up</h2>
          <Form onSubmit={handleSubmitBooking}>
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
            <DistanceCalculator pickupAddress={pickupAddress} destination={destination} phoneNumber={phoneNumber} handleSubmitBooking={handleSubmitBooking} />
            {booking.totalAmount && <Button className="col-12" type="submit" variant="primary">Submit Booking</Button>}
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default PakuhaPadala;
