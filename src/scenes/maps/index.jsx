import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '50vw',
  height: '50vh',
};
const defaultCenter = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

const Maps = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD2g2JoNzcR74tQtdwQARnaeDgvxke3OQo',
    libraries,
  });
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(defaultCenter);

  useEffect(() => {
    const handleResize = () => {
      map && map.panTo(center);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [map, center]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        onLoad={mapInstance => setMap(mapInstance)}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default Maps;
