import React, { useState } from 'react';
import DistanceCalculator from '../DistanceCalculator';
import { useSelector } from 'react-redux';
import { setHeaders, url } from "../../slices/api";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
     toast('Booked successfully!');
    navigate('/user/userBooking')
    .catch(error => {
    console.log(error);
  });
}
  
  return (
    <div>
       <h2>Pakuha/Padala</h2>

       <label htmlFor="item">Item:</label>
      <input type="text" id="item" value={item} onChange={handleItemChange} />
      <label htmlFor="itemDetails">Item Details:</label>
      <input type="text" id="itemDetails" value={itemDetails} onChange={handleItemDetailsChange} />
      <label htmlFor="pickupAddress">Pickup Address:</label>
      <input type="text" id="pickupAddress" value={pickupAddress} onChange={handlePickupAddressChange} />
      <br />
      <label htmlFor="destination">Destination:</label>
      <input type="text" id="destination" value={destination} onChange={handleDestinationChange} />
      <br />
      <label htmlFor="phoneNumber">Phone Number:</label>
      <input type="text" id="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />
      <br />
      <DistanceCalculator pickupAddress={pickupAddress} destination={destination} phoneNumber={phoneNumber} handleSubmitBooking={handleSubmitBooking}/>
      <button onClick={handleSubmitBooking}>Submit Booking</button>
    </div>
  );
};

export default PakuhaPadala;
