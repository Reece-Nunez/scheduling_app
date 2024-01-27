// components/Scheduler.js

import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/ApiService';

const Scheduler = () => {
  const [scheduleData, setScheduleData] = useState(null);

  useEffect(() => {
    fetchData()
      .then(data => setScheduleData(data))
      .catch(error => console.error(error));
  }, []);

  // Render your schedule data in the component
  // ...

  return (
    <div>
        
    </div>
  );
};

export default Scheduler;
