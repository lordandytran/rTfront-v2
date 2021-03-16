import { useEffect, useReducer, useState } from 'react';
import getRates from '../settings/getRates';

/**
 * useSettings hook returns minratio, maxratio, upload, and download rates.
 * @param {callback} setPlaceholder callback for placeholder in settings form
 * @returns {[Object, callback]} Object containing rates and callback to 
 * indicate a change in settings to rerender hook. 
 */
const useSettings = (setPlaceholder) => {
  const [change, setChange] = useState(false);
  const [settings, setSettings] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      uplaod: 0,
      download: 0,
      minratio: 0,
      maxratio: 0,
    }
  );

  useEffect(() => {
    Promise.all([
      getRates('minratio'),
      getRates('maxratio'),
      getRates('upload'),
      getRates('download'),
    ])
    .then((results) => {
      const data = {
        minratio: Number(results[0]) / 1000,
        maxratio: Number(results[1]) / 1000,
        upload: Number(results[2]),
        download: Number(results[3]),
      };
      setPlaceholder(data);
      setSettings(data);
    })
    .catch(() => console.log('Unable to retrieve torrent settings'));
  }, [change, setPlaceholder]);

  return [settings, setChange];
}

export default useSettings;