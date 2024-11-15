// Timer.js

import React from 'react';
import { useState, useEffect } from 'react';

const Timer = (curTime) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
  
    const getTime = (curTime) => {
      const time = curTime - Date.now();
  
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    };
  
    useEffect(() => {
      const interval = setInterval(() => getTime(curTime), 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      days,
      hours,
      minutes,
      seconds
    );
  };