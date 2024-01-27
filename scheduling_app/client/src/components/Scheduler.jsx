// components/Scheduler.js

import React, { useEffect, useState } from 'react';
import { getEvents, createEvent } from '../services/ApiService';

const Scheduler = () => {
  const [newEventName, setNewEventName] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(console.error);
  }, []);

  const handleAddEvent = () => {
    const eventData = { name: newEventName };
    createEvent(eventData)
      .then((addedEvent) => {
        setEvents([...events, addedEvent]);
        setNewEventName('');
      })
      .catch(console.error)
  };

  return (
    <div>
        <h1>Schedule An Appointment</h1>
        <ul>
          {events.map((event, index) => (
            <li key={index}>{event.name}</li>
          ))}
        </ul>
        <div>
          <input
            type='text'
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
            placeholder="New Event Name"
          />
          <button onClick={handleAddEvent}>Add Event</button>

        </div>
    </div>
  );
};

export default Scheduler;
