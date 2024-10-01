import React, { useState } from 'react';

function GuestListApp() {
  const [guests, setGuests] = useState([]); // State to store the list of guests
  const [firstName, setFirstName] = useState(''); // State to store the first name input
  const [lastName, setLastName] = useState(''); // State to store the last name input

  // Function to handle adding a new guest
  const handleAddGuest = () => {
    if (firstName.trim() !== '' && lastName.trim() !== '') {
      const newGuest = {
        id: guests.length + 1, // Simple ID based on guest count
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
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddGuest();
    }
  };

  // Function to handle removing a guest
  const handleRemoveGuest = (id) => {
    setGuests(guests.filter((guest) => guest.id !== id)); // Remove guest by id
  };

  // Function to handle toggling attending status
  const handleToggleAttending = (id) => {
    setGuests(
      guests.map((guest) =>
        guest.id === id ? { ...guest, attending: !guest.attending } : guest,
      ),
    );
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
      />

      {/* Last Name Field */}
      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        onKeyDown={handleKeyDown} // Press 'Enter' to add guest
      />

      {/* List of Guests */}
      <ul>
        {guests.map((guest) => (
          <div key={`guest-${guest.id}`} data-test-id={`guest-${guest.id}`}>
            <li>
              {guest.firstName} {guest.lastName} -{' '}
              {guest.attending ? 'Attending' : 'Not Attending'}
              {/* Checkbox for toggling attending status */}
              <input
                type="checkbox"
                checked={guest.attending}
                onChange={() => handleToggleAttending(guest.id)} // Toggle attending status
                aria-label={`${guest.firstName} ${guest.lastName} attending status`} // Accessible label
              />
              {/* Remove Button */}
              <button
                onClick={() => handleRemoveGuest(guest.id)} // Handle guest removal
                aria-label={`Remove ${guest.firstName} ${guest.lastName}`} // Accessible label
              >
                Remove
              </button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default GuestListApp;
