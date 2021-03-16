import { useContext, useEffect, useState } from 'react';
import { ActiveContext } from '../../components/ActiveContext';
import getUpdateInterval from '../settings/getUpdateInterval';
const useInterval = require('./useInterval').useInterval;

/**
 * useList returns the list of torrent files or peers updated on an interval.
 * @param {string} torrentHash Hash value of torrent 
 * @param {callback} callList Module function containing list call
 * @returns List of torrent files or peers
 */
const useList = (torrentHash, callList) => {
  const [active] = useContext(ActiveContext);
  const [hash, setHash] = useState(torrentHash);
  const [interval, setInterval] = useState(5000);
  const [list, setList] = useState({});

  // retrieves and sets the update interval on render
  useEffect(() => {
    getUpdateInterval()
    .then((result) => setInterval(result))
    .catch((error) => setInterval(error.data));
  }, []);

  /**
   * retrieves and sets the initial file list on render.
   * rerenders when the Active Context is changed,
   * restarting the interval timer.
   * */ 
  useEffect(() => {
    callList(torrentHash)
    .then((result) => {
      //clear list first
      setList({});
      setList(result);
      setHash(torrentHash);
    })
    .catch(() => console.log('Unable to retrieve torrent list.'));
  }, [torrentHash, callList, active]);

  /**
   * updates the file list on the retrieved interval.
   * stops when the Active Context is false (When all torrents are stopped).
   */
  useInterval(async () => {
    await callList(hash)
    .then((result) => setList(result))
    .catch((error) => console.log(error));
  }, active ? interval : null);

  return [list];
}

export default useList;