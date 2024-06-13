import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const Header = ({ onSearch, onUnitChange, unit }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(location);
  };

  const onChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <header className="header">
      <img src="/path/to/logo.png" alt="Logo" />
      <Form className="search-container" onSubmit={handleSubmit}>
        <FormControl
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={onChange}
        />
      </Form>
      <div className="unit-buttons">
        <Button
          className={`btn ${unit === 'C' ? 'btn-primary' : 'btn-light'}`}
          onClick={() => onUnitChange('C')}
        >
          °C, km/h
        </Button>
        <Button
          className={`btn ${unit === 'F' ? 'btn-primary' : 'btn-light'}`}
          onClick={() => onUnitChange('F')}
        >
          °F, mph
        </Button>
      </div>
    </header>
  );
};

export default Header;
