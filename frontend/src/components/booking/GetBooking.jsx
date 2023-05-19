import React from 'react';

const GetBooking = ({ pickup, dest, phoneNumber, onPickupAddressChange, onDestinationChange, onPhoneNumberChange }) => {
  return (
    <form>
      <div>
        <label htmlFor="pickup-address">Pickup Address:</label>
        <input type="text" id="pickup-address" value={pickup} onChange={onPickupAddressChange} required/>
      </div>
      <div>
        <label htmlFor="destination">Destination:</label>
        <input type="text" id="destination" value={dest} onChange={onDestinationChange} required/>
      </div>
      <div>
        <label htmlFor="phone-number">Phone Number:</label>
        <input type="tel" id="phone-number" value={phoneNumber} onChange={onPhoneNumberChange} />
      </div>
    </form>
  );
};

export default GetBooking;
