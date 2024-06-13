import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const Header = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(location);
  };

  return (
    <header className="header">
      <img src="/path/to/logo.png" alt="Logo" />
      <Form className="search-container" onSubmit={handleSubmit}>
        <FormControl
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        
      </Form>
      <div className="unit-buttons">
        <Button className="btn btn-light">°C, km/h</Button>
        <Button className="btn btn-light">°F, mph</Button>
      </div>
    </header>
  );
};

export default Header;
