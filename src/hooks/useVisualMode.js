// Custom hook called useVisualMode

import React, { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);  
  const [history, setHistory] = useState([initial]); // This line is new!

  const transition = (newMode) => {
    // setMode(newMode);
    setHistory(prev => {
      console.log('prev is: ', prev);
      const arr = [...prev];
      arr.push(newMode);
      return arr;
    })
  };

  const back = () => {
    console.log('in the beginning, history is: ', history)
    if (history.length > 1) {
      setHistory(prev => {
        const arr = [...prev];
        arr.pop();
        return arr;
      });
      console.log('after popping, history is: ', history)
      // setMode(history[history.length - 1]);
    }
  };

  return { mode: history[history.length - 1], transition, back };
};

export default useVisualMode;