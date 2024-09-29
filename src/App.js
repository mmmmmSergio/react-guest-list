import React, { useState } from 'react';

function GuestListApp() {
  const [guests, setGuests] = useState([]); // State to store the list of guests
  const [firstName, setFirstName] = useState(''); // State to store the first name input
  const [lastName, setLastName] = useState(''); // State to store the last name input

  // Function to handle adding a new guest
  const handleAddGuest = () => {
    if (firstName.trim() !== '' && lastName.trim() !== '') {
      const newGuest = {
        id: Date.now(), // Unique ID based on timestamp
        firstName,
        lastName,
        attending: false, // Default not attending
      };
      setGuests([...guests, newGuest]);
      setFirstName(''); // Clear input fields
      setLastName(''); // Clear input fields
    }
  };

  // Function to handle pressing 'Enter' on last name input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddGuest();
    }
  };

  return (
    <div>
      <h1>Guest List App</h1>

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
        onKeyPress={handleKeyPress} // Press 'Enter' to add guest
      />

      {/* Button to add guest */}
      <button onClick={handleAddGuest}>Add Guest</button>

      {/* List of Guests */}
      <ul>
        {guests.map((guest) => (
          <li key={guest.id}>
            {guest.firstName} {guest.lastName} -{' '}
            {guest.attending ? 'Attending' : 'Not Attending'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GuestListApp;
