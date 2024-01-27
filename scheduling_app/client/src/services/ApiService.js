// services/ApiService.js

const baseUrl = '/api'; // This will work with the proxy setting in development

export const fetchData = async () => {
  try {
    const response = await fetch(`${baseUrl}/some-endpoint`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error; // Re-throw the error so you can handle it in the component
  }
};

// You can add more functions for POST, PUT, DELETE requests here...
