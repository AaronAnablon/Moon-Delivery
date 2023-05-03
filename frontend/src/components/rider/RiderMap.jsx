import React, { useState, useEffect, useRef } from 'react';

const RiderMap = () => {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let map;
    const loadMapScenario = async () => {
      try {
        map = new window.Microsoft.Maps.Map(mapRef.current, {
          center: new window.Microsoft.Maps.Location(47.60357, -122.3295),
          zoom: 12
        });

        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const userLocation = new window.Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);
        const userPushpin = new window.Microsoft.Maps.Pushpin(userLocation);
        map.entities.push(userPushpin);

        if (window.Microsoft.Maps.Search) {
          const searchManager = new window.Microsoft.Maps.Search.SearchManager(map);
          const reverseGeocodeRequestOptions = {
            location: userLocation,
            callback: (result) => {
              if (result && result.results && result.results.length > 0) {
                setLocation(result.results[0].address.formattedAddress);
              } else {
                setLocation('Unknown');
              }
            }
          };
          searchManager.reverseGeocode(reverseGeocodeRequestOptions);
        } else {
          setLocation('Unknown');
        }
      } catch (error) {
        setError(error);
      }
    };

    loadMapScenario();

    return () => {
      if (map) {
        map.dispose();
      }
    };
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <div ref={mapRef} style={{width: '300px', height: '500px'}}></div>
      <p>{location}</p>
    </div>
  );
};

export default RiderMap;
