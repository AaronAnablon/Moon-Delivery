import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBooking } from '../../slices/bookingSlice';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {toast} from 'react-toastify';

const DistanceCalculator = ({ pickupAddress, destination, phoneNumber }) => {
  const [distance, setDistance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const API_KEY = '4e17e78fbdc34b788640c77b5fb1854f';

  const handleCalculateDistance = () => {
    setIsLoading(true);

    // Perform geocoding for pickup address
    axios
      .get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(pickupAddress)}&apiKey=${API_KEY}`)
      .then(response => {
        const pickupLocation = response.data.features[0]?.geometry.coordinates;
        // Perform geocoding for destination address
        axios
          .get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(destination)}&apiKey=${API_KEY}`)
          .then(response => {
            const destination = response.data.features[0]?.geometry.coordinates;
            // Calculate the distance between the pickup and destination addresses
            axios
              .get(`https://api.geoapify.com/v1/routing?waypoints=${pickupLocation[1]},${pickupLocation[0]}|${destination[1]},${destination[0]}&mode=drive&apiKey=${API_KEY}`)
              .then(response => {
                const distanceInMeters = response.data.features[0]?.properties?.distance || 0;
                const distanceInKm = (distanceInMeters / 1000).toFixed(2);
                setDistance(distanceInKm);
              })
              .catch(error => {console.log(error)
              toast.error('Something went wrong. Please try changing the address or try rewriting the address!');
          })
              .finally(() => setIsLoading(false));
          })
          .catch(error => {console.log(error)
            toast.error('Something went wrong. Please try changing the address or try rewriting the address!');
          })
          .finally(() => setIsLoading(false));
      })
      .catch(error => {console.log(error)
        toast.error('Something went wrong. Please try changing the address or try rewriting the address!');
      })
      .finally(() => setIsLoading(false));
  };

  const currentTime = new Date();
  const isNight = currentTime.getHours() >= 20 || currentTime.getHours() < 6;
  const extraCharge = isNight ? 20 : 0;

  useEffect(() => {
    if (distance !== null) {
      dispatch(
        setBooking({
          address: { destination: destination, pickUpAdress: pickupAddress },
          totalAmount: ((distance <= 2 ? 0 : (distance - 2) * 10) + 50 + extraCharge),
          phoneNumber: phoneNumber,
          status: 'booked',
        })
      );
    } else {
      dispatch(
        setBooking({
          address: "",
          totalAmount: "",
          phoneNumber: "",
          status: '',
        })
      );
    }
  }, [distance]);

  const totalFare = ((distance <= 2 ? 0 : (distance - 2) * 10) + 50 + extraCharge);

  const currency = (price) => {
    return price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })
   }

  return (
    <div className="row border-top border-bottom">
      <Button className="m-3 col-11" onClick={handleCalculateDistance}>
        {isLoading ? <span>Calculating...</span> : 'Fare'}
      </Button>
      <div className="col-12 d-flex justify-content-center">
        {distance && <p className="col-6">Distance: {distance} km</p>}
        {distance && <p className="col-6">Fare: {currency(totalFare)}</p>}
      </div>
    </div>
  );
};

export default DistanceCalculator;
