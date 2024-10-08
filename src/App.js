import React, { useEffect, useState } from 'react';

const API_URL = 'https://8vkwhz-4000.csb.app'; // Base URL for your locally running API

function GuestListApp() {
  const [guests, setGuests] = useState([]); // State to store the list of guests
  const [firstName, setFirstName] = useState(''); // State to store the first name input
  const [lastName, setLastName] = useState(''); // State to store the last name input
  const [isLoading, setIsLoading] = useState(true); // State to handle loading

  // Function to fetch all guests from the API
  const fetchGuests = async () => {
    setIsLoading(true); // Set loading to true when fetching guests
    try {
      const response = await fetch(`${API_URL}/guests`); // Fetching guest list from API
      const data = await response.json();
      setGuests(data); // Populate the state with the data fetched from the API
    } catch (error) {
      console.error('Error fetching guests:', error);
    } finally {
      setIsLoading(false); // Always set loading to false after fetching data
    }
  };

  // Fetch all guests on component mount
  useEffect(() => {
    const loadGuests = async () => {
      await fetchGuests(); // Await the async fetchGuests call
    };

    loadGuests().catch((error) => {
      console.error('Error loading guests:', error);
    }); // Handle errors to satisfy ESLint
  }, []);

  // Function to add a new guest to the API
  const handleAddGuest = async () => {
    if (firstName.trim() !== '' && lastName.trim() !== '') {
      try {
        const newGuest = {
          firstName,
          lastName,
        };
        const response = await fetch(`${API_URL}/guests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newGuest),
        });
        const data = await response.json();

        // Update the local state with the new guest
        setGuests([...guests, data]);
        setFirstName(''); // Clear input fields
        setLastName(''); // Clear input fields
      } catch (error) {
        console.error('Error adding guest:', error);
      }
    }
  };

  // Function to toggle the attending status of a guest and update the API
  const handleToggleAttending = async (guest) => {
    const updatedGuest = { ...guest, attending: !guest.attending };

    // Update local state for immediate UI feedback
    setGuests((prevGuests) =>
      prevGuests.map((g) => (g.id === guest.id ? updatedGuest : g)),
    );

    // Send the updated guest to the API
    try {
      const response = await fetch(`${API_URL}/guests/${guest.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: updatedGuest.attending }),
      });

      if (!response.ok) {
        throw new Error('Failed to update guest');
      }
    } catch (error) {
      console.error('Error updating guest attending status:', error);
    }
  };

  // Function to delete a guest
  const handleDeleteGuest = async (guestId) => {
    try {
      await fetch(`${API_URL}/guests/${guestId}`, {
        method: 'DELETE',
      });

      // Remove the guest from the local state
      setGuests((prevGuests) => prevGuests.filter((g) => g.id !== guestId));
    } catch (error) {
      console.error('Error deleting guest:', error);
    }
  };

  // Function to handle pressing 'Enter' in the last name input
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await handleAddGuest(); // Await the async add guest function to satisfy ESLint
    }
  };

  return (
    <div>
      <h1>Guest List</h1>

      {/* First Name Field */}
      <label htmlFor="firstName">First name:</label>
      <input
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        disabled={isLoading} // Keep visible but disabled while loading
      />

      {/* Last Name Field */}
      <label htmlFor="lastName">Last name:</label>
      <input
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        onKeyDown={handleKeyDown} // Handle 'Enter' press to add guest
        disabled={isLoading} // Keep visible but disabled while loading
      />

      {/* Loading Indicator */}
      {isLoading && <p>Loading...</p>}

      {/* List of Guests */}
      <ul>
        {guests.map((guest) => (
          <div key={`guest-${guest.id}`} data-test-id="guest">
            <li>
              {guest.firstName} {guest.lastName} - {/* Status Label */}
              <span>
                {guest.attending ? 'Attending' : 'Not attending'}
              </span>{' '}
              {/* Attending Checkbox */}
              <input
                type="checkbox"
                checked={guest.attending}
                onChange={() => handleToggleAttending(guest)} // Toggle attending status
                aria-label={`${guest.firstName} ${guest.lastName} attending status`}
              />{' '}
              {/* Remove Button */}
              <button
                aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                onClick={() => handleDeleteGuest(guest.id)}
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
