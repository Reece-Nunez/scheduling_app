import React, { useEffect, useState } from 'react';
import { getEvents, createEvent } from '../services/ApiService';

const Scheduler = () => {
  const [newEventName, setNewEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(console.error);
  }, []);

  const handleAddEvent = () => {
    const eventData = { name: newEventName, date: eventDate, time: eventTime };
    createEvent(eventData)
      .then((addedEvent) => {
        setEvents([...events, addedEvent]);
        setNewEventName('');
        setEventDate('');
        setEventTime('');
      })
      .catch(console.error)
  };

  return (
    <div className='flex flex-col justify-center items-center mt-32'>
        <h1 className='m-8'>Schedule An Appointment</h1>
        <div>
          <label htmlFor="eventName">New Event Name:</label>
          <input
            id='eventName'
            name='eventName'
            type='text'
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
            placeholder="New Event Name"
            className='m-8 shadow-lg border-2 border-black p-2 rounded-md'
          />
          <label htmlFor="eventDate">Event Date:</label>
          <input
            id='eventDate'
            name='eventDate'
            type='date'
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className='m-8 shadow-lg border-2 border-black p-2 rounded-md'
          />
          <label htmlFor="eventTime">Event Time:</label>
          <input
            id='eventTime'
            name='eventTime'
            type='time'
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            className='m-8 shadow-lg border-2 border-black p-2 rounded-md'
          />
        </div>
        <div className='flex flex-col justify-center items-center'>
          <button className='shadow-lg bg-black text-white rounded-lg p-1 w-32' onClick={handleAddEvent}>Add Event</button>
        </div>
    </div>
  );
};

export default Scheduler;
