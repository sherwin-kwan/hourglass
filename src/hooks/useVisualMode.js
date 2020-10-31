// Custom hook called useVisualMode

import { useState } from 'react';

const useVisualMode = (initial) => {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  const transition = (newMode, isReplace) => {
    // setMode(newMode);
    setHistory(prev => {
      console.log('prev is: ', prev);
      const arr = [...prev];
      if (isReplace) {
        arr.splice(arr.length - 1, 1, newMode);
      } else {
        arr.push(newMode);
      }
      console.log('arr is now: ', arr);
      return arr;
    })
  };

  const back = () => {
    if (history.length > 1) {
      setHistory(prev => {
        const arr = [...prev];
        arr.pop();
        return arr;
      });
      // setMode(history[history.length - 1]);
    }
  };

  return { mode: history[history.length - 1], transition, back };
};

export default useVisualMode;