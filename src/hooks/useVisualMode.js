// Custom hook called useVisualMode

import { useState } from 'react';

const useVisualMode = (initial) => {
  const [history, setHistory] = useState([initial]); 

  const transition = (newMode, isReplace) => {
    setHistory(prev => {
      const arr = [...prev];
      if (isReplace) {
        arr.splice(arr.length - 1, 1, newMode);
      } else {
        arr.push(newMode);
      }
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
    }
  };

  return { mode: history[history.length - 1], transition, back };
};

export default useVisualMode;