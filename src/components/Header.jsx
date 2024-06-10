import React from 'react';

const Header = ({ onSearch }) => {
  const [location, setLocation] = React.useState('');

  const handleSearch = () => {
    onSearch(location);
  };

  return (
    <header>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Search"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </header>
  );
};

export default Header;
