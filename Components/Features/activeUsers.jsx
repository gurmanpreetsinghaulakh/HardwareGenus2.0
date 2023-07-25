import React, { useState, useEffect } from 'react';

const ActiveUsers = () => {
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    let previousUsers = 0;
    let isDecreasing = false;

    const interval = setInterval(() => {
      if (previousUsers >= 140) {
        const decreaseAmount = Math.ceil(previousUsers * 0.05); // Calculate the decrease amount (5% of previousUsers)
        const newUsers = previousUsers - decreaseAmount;

        setActiveUsers(newUsers);
        previousUsers = newUsers;
        isDecreasing = true;
      } else {
        const randomUsers = Math.floor(Math.random() * 30) + 39; // Generate a random number between 9 and 33
        setActiveUsers(randomUsers);
        previousUsers = randomUsers;
        isDecreasing = false;
      }
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className="users">{activeUsers} Active Readers</div>;
};

export default ActiveUsers;
