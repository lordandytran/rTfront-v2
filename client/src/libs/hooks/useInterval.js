import { useEffect, useRef } from 'react';

/**
 * useInterval is an internal hook that allows the
 * setInterval method to be used in a custom hook.
 * @param {callback} callback 
 * @param {number} delay 
 */
export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}