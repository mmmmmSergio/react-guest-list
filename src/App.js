import React, { useState } from 'react';

function GuestListApp() {
  const [guests, setGuests] = useState([]); // State to store the list of guests
  const [firstName, setFirstName] = useState(''); // State to store the first name input
  const [lastName, setLastName] = useState(''); // State to store the last name input

  // Function to handle adding a new guest
  const handleAddGuest = () => {
    if (firstName.trim() !== '' && lastName.trim() !== '') {
      const newGuest = { firstName, lastName };
      setGuests([...guests, newGuest]);
      setFirstName(''); // Clear input field after adding guest
      setLastName(''); // Clear input field after adding guest
    }
  };

  return (
    <div>
      <h1>Guest List</h1>

      {/* First Name Field */}
      <label htmlFor="firstName">First Name:</label>
      <input
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Enter first name"
      />

      {/* Last Name Field */}
      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Enter last name"
      />

      {/* Button to add guest */}
      <button onClick={handleAddGuest}>Add Guest</button>
    </div>
  );
}

export default GuestListApp;
