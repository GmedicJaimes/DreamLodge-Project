import React from 'react';

const DestinationSelector = ({ selectedDestination, destinations, onDestinationChange }) => {
  return (
    <div>
      <label>Destination:</label>
      <select
        value={selectedDestination}
        onChange={(e) => onDestinationChange(e.target.value)}
      >
        <option value="">Select destination</option>
        {destinations.map((destination) => (
          <option key={destination.id} value={destination.name}>
            {destination.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DestinationSelector;