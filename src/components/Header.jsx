import React, { useState } from 'react';

const Header = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(location);
    }
  };

  return (
    <header className="header">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </header>
  );
};

export default Header;
