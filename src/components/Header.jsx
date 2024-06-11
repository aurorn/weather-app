import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

const Header = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(location);
    }
  };

  return (
    <header className="header">
      <img src="/path/to/logo.png" alt="Logo" />
      <Form className="search-container">
        <FormControl
          type="text"
          placeholder="London"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </Form>
      <div className="unit-buttons">
        <button className="btn btn-light">°C, km/h</button>
        <button className="btn btn-light">°F, mph</button>
      </div>
    </header>
  );
};

export default Header;
