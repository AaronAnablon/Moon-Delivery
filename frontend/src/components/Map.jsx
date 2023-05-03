import React, { useState, useEffect, useRef } from 'react';
import bikingMountain from './bikingMountain.svg';

const Maps = ({ pickupAddress, destination, riderLocations }) => {
  const mapRef = useRef(null);
  const [rider, setRider] = useState('');

  useEffect(() => {
    try {
    const map = new window.Microsoft.Maps.Map(mapRef.current, {
      center: new window.Microsoft.Maps.Location(16.8000, 121.1369),
      zoom: 12,
    });
    if (pickupAddress && destination) {
      // Add pushpins for rider locations
      window.Microsoft.Maps.loadModule('Microsoft.Maps.Search', () => {
        const searchManager = new window.Microsoft.Maps.Search.SearchManager(map);
        const loc = riderLocations.map((rider) => rider.location);
        loc.forEach((riderLocation, index) => {
          const riderRequestOptions = {
            bounds: map.getBounds(),
            where: riderLocation,
            callback: (answer, userData) => {
              if (answer && answer.results && answer.results.length > 0) {
                const riderLocation = answer.results[0].location;
                const riderPushpin = new window.Microsoft.Maps.Pushpin(riderLocation, { icon: bikingMountain });
                map.entities.push(riderPushpin);
                window.Microsoft.Maps.Events.addHandler(riderPushpin, 'click', () => {
                  const riders = riderLocations[index];
                  setRider(riders);
                });
              }
            },
          };
          searchManager.geocode(riderRequestOptions);
        });
        

        // Add pushpin for user's location
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = new window.Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);
            const userPushpin = new window.Microsoft.Maps.Pushpin(userLocation);
            map.entities.push(userPushpin);
          },
          (error) => {
            console.error(error);
          }
        );

        window.Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
          // Create a new DirectionsManager object
          const directionsManager = new window.Microsoft.Maps.Directions.DirectionsManager(map);

          // Set the request options
          directionsManager.setRequestOptions({
            routeMode: window.Microsoft.Maps.Directions.RouteMode.driving,
            routeDraggable: false,
            icon: bikingMountain,
          });

          // Create and add waypoints to the route
          const waypoint1 = new window.Microsoft.Maps.Directions.Waypoint({ address: pickupAddress });
          directionsManager.addWaypoint(waypoint1);

          const waypoint2 = new window.Microsoft.Maps.Directions.Waypoint({ address: destination });
          directionsManager.addWaypoint(waypoint2);

          // Calculate the route
          directionsManager.calculateDirections();
          
        });
      });
    }
  } catch (error) {
    console.error('Error while getting distance:', error);
  }
}, [pickupAddress, destination]);

  return (
    <div>
      <p>{rider ? `${rider.Name} is at ${rider.location}`: ''}</p>
      <a  style={{all: 'unset'}} href={rider.phone}>{rider ? `Phone Number: 📞🟢 ${rider.phone}`  : null}</a>
      <div ref={mapRef} style={{ height: '400px', width: '60%' }}>
        {pickupAddress && destination && <p>Loading map...</p>}
      </div>
    </div>
  );
};

export default Maps;
