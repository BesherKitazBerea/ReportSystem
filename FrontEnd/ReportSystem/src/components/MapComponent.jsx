/** 
 * Author: Besher Kitaz 
 * This file contains a component that access Google API for map to place a pin
*/

import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import API_KEY from '../apiKey';

import '../css/mapComponent.css'

// Define the container style for the map component. Adjust width and height as needed.
const containerStyle = {
  width: '80vw',
  height: '75vh',
};

// The center of the map. Set to Damascus initially
const initialCenter = {
  lat: 33.5132, // Example: Damascus, Syria
  lng: 36.2768,
};

  // Main function to render the map component
function LocationSelector() {
  // State variables for selected location and confirmation button state
  const [selectedLocation, setSelectedLocation] = useState(null);

  // To lock the confirmation button in case no location is selected
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const navigate = useNavigate();

  // Load Google Maps API asynchronously using the provided API key.
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });

  // Handle user click on the map
  const handleMapClick = (event) => {
    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setSelectedLocation(newLocation);
    setIsButtonEnabled(true); // Unlock the confirmation button
  };

  // Moves to next page
  const handleConfirmation = () => {
    navigate('/report', { state: { lat: selectedLocation.lat, lng: selectedLocation.lng } });
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return (
    <div  >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initialCenter}
        zoom={12}
        onClick={handleMapClick} // Add marker at clicked location
      >
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>

      {/* Confirmation Button */}
      <div className='map-buttons'>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007BFF' ,
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Back
        </button> 

        <button
          onClick={handleConfirmation}
          disabled={!isButtonEnabled} // Lock/Unlock button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: isButtonEnabled ? '#007BFF' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isButtonEnabled ? 'pointer' : 'not-allowed',
          }}
        >
          Confirm Location
        </button>
      </div>
    </div>
  );
}

export default LocationSelector;



