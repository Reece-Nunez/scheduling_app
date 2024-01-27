// services/ApiService.js

const BASE_URL = '/api/events'; 

//Function to get a list of events
export const getEvents = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Error fetching events');
    }
    return await response.json();
  } catch (error) {
    console.error('There has been a problem with your fetch operation: ' + error);
    throw error;
  }
};

//Function to create a new event
export const createEvent = async (eventData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error('Error creating event');
    }
    return await response.json();
  } catch (error) {
    console.error('There has been a problem with your fetch operation: ' + error);
    throw error;
  }
}

