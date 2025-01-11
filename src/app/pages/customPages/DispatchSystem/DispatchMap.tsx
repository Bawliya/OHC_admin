// src/MapComponent.tsx
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Select from 'react-select';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface DeliveryBoy {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: string;
  phone: string;
}

interface MapComponentProps {
  deliveryBoys: DeliveryBoy[];
}

const DispatchMap: React.FC<MapComponentProps> = ({ deliveryBoys }) => {
  const [hoveredBoy, setHoveredBoy] = useState<DeliveryBoy | null>(null);
  const [selectedBoy, setSelectedBoy] = useState<DeliveryBoy | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const mapContainerStyle = {
    height: '500px',
    width: '100%',
  };

  const defaultCenter = {
    lat: 21.553604878228676,
    lng: 39.16133890191932,
  };

  const handleSelectChange = (selectedOption: any) => {
    const boy = deliveryBoys.find(b => b.id === selectedOption?.value) || null;
    setSelectedBoy(boy);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const filteredOptions = inputValue.length >= 2
    ? deliveryBoys
        .filter(boy => boy.name.toLowerCase().includes(inputValue.toLowerCase()))
        .map(boy => ({
          value: boy.id,
          label: boy.name,
        }))
    : [];


  return (
    <div className="p-5">
      <LoadScript googleMapsApiKey="AIzaSyASdpNTLU5ZEqnl9eG0yP3n8GHmXGR0igM">
        <div className="mb-3 col-3">
          <label htmlFor="deliveryBoySelect" className="form-label">Select Delivery Boy:</label>
          <Select
            id="deliveryBoySelect"
            options={filteredOptions}
            onChange={handleSelectChange}
            onInputChange={handleInputChange}
            inputValue={inputValue}
            isClearable
            noOptionsMessage={() => 'No delivery boys found'}
          />
        </div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={selectedBoy ? { lat: selectedBoy.lat, lng: selectedBoy.lng } : defaultCenter}
          zoom={selectedBoy ? 14 : 11}
        >
          {deliveryBoys.map((boy) => (
            <Marker
              key={boy.id}
              position={{ lat: boy.lat, lng: boy.lng }}
              onClick={() => setHoveredBoy(boy)}
              icon={{
                url: '/media/logos/boy2.png', // Replace with your custom icon URL
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(16, 32),
              }}
            >
              {hoveredBoy?.id === boy.id && (
                <InfoWindow
                  position={{ lat: boy.lat, lng: boy.lng }}
                  onCloseClick={() => setHoveredBoy(null)}
                >
                  <div>
                    <h3>{boy.name}</h3>
                    <p>Status: {boy.status}</p>
                    <p>Phone: {boy.phone}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default DispatchMap;
