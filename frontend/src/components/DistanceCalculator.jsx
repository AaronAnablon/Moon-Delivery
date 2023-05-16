import React, {  useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { setBooking } from '../slices/bookingSlice';


const DistanceCalculator = ({ pickupAddress, destination, phoneNumber }) => {
  const [distance, setDistance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

   
  const API_KEY = 'Aki1DjFxiqk8kq1m9KGmU0ywLO9SdHF8gCYuIfK0g4m_G2OnqdDvcZj20SYAHbNH';

  const handleCalculateDistance = () => {
       setIsLoading(true);
    const pickupUrl = `https://dev.virtualearth.net/REST/v1/Locations?q=${pickupAddress}&key=${API_KEY}`;
    const destinationUrl = `https://dev.virtualearth.net/REST/v1/Locations?q=${destination}&key=${API_KEY}`;
    
    // Get the longitude and latitude of the pickup address
    fetch(pickupUrl)
      .then(response => response.json())
      .then(data => {
        const pickupLocation = data.resourceSets[0].resources[0].point.coordinates;
        
        // Get the longitude and latitude of the destination address
        fetch(destinationUrl)
          .then(response => response.json())
          .then(data => {
            const destinationLocation = data.resourceSets[0].resources[0].point.coordinates;
            
            // Calculate the distance between the pickup and destination addresses
            const distanceUrl = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${pickupLocation[0]},${pickupLocation[1]}&destinations=${destinationLocation[0]},${destinationLocation[1]}&travelMode=walking&key=${API_KEY}`;
            fetch(distanceUrl)
              .then(response => response.json())
              .then(data => {
                setDistance(data.resourceSets[0].resources[0].results[0].travelDistance.toFixed(2));
              })
              .catch(error => console.log(error))
              .finally(() => setIsLoading(false));
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  const currentTime = new Date();
const isNight = currentTime.getHours() >= 20 || currentTime.getHours() < 6;
const extraCharge = isNight ? 20 : 0;


  useEffect(() => {
   if (distance !== null) {
    dispatch(setBooking({ 
      address: {destination: destination, pickUpAdress: pickupAddress}, 
      totalAmount: ((distance <=2 ? 0 : (distance - 2) * 10) + 50 + extraCharge),
      phoneNumber: phoneNumber,
      status: 'booked',
      }))
   }
  }, [distance])

  const totalFare = ((distance <=2 ? 0 : (distance - 2) * 10) + 50 + extraCharge);

  return (
    <div>
      <div>
      {distance && <p>Distance: {distance} km</p>}
      {distance && <p>Fare: {`₱ ${totalFare}`}</p>}
        <button onClick={handleCalculateDistance}>{isLoading && <span>Calculating...</span>}Fare</button>
      </div>
    </div>
  );
};

export default DistanceCalculator;
