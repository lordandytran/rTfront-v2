import { useContext, useEffect, useState } from 'react';
import { ActiveContext } from '../../components/ActiveContext';
import listTorrents from '../torrent/listTorrents';
import getUpdateInterval from '../settings/getUpdateInterval';
import useActivity from './useActivity';
const useInterval = require('./useInterval').useInterval;

/**
 * useTorrent hook returns all torrents updated on an interval.
 * @param {string} initial Torrent view in rtorrent 
 * @returns {[Object}]} object containing torrents
 */
const useTorrents = (initial) => {
  // Activity listener hook for different browser windows
  useActivity();
  const [interval, setInterval] = useState(5000);
  const [active, setActive] = useContext(ActiveContext);
  const [view, setView] = useState('main');
  const [torrents, setTorrents] = useState({});

  // retrieves and sets the update interval on render
  useEffect(() => {
    getUpdateInterval()
    .then((result) => setInterval(result))
    .catch(() => console.log('Unable to retrieve update interval.'));
  }, []);

  /**
   * retrieves and sets the torrent list on render.
   * rerenders when the Active Context is changed,
   * restarting the interval timer.
   * */ 
  useEffect(() => {
    listTorrents(initial)
    .then((result) => {
      setView(initial);
      setTorrents({});
      setTorrents(result);
    })
    .catch(() => console.log('Unable to retrieve torrent list.'));
  }, [initial, active]);

  /**
   * iterates thorugh torrent list from API call and updates the list.
   * checks if torrent is stopped or an error occurred
   * to set active context.
   * @param {object} result Torrent list 
   */
  const update = (result) => {
    // flag to indicate if all torrents are stopped
    let stopped = true;
    // checks if previous list state is stopped before update
    for (const [key, value] of Object.entries(result)) {
      if (torrents[key] &&
        (value.status === 'Stopped' || value.status === 'Closed') &&
        (torrents[key].eta === '∞' && value.eta === '∞')) {
        continue;
      }
      else {
        stopped = false;
      }
      setTorrents((prev) => ({ ...prev, ...{[key]: value}}));
    }
    // throws error if all torrents are stopped
    if (stopped) {
      throw new Error('All torrents stopped.');
    }
  }

  /**
   * updates the file list on the retrieved interval.
   * stops when the Active Context is false
   */
  useInterval(async() => {
    await listTorrents(view)
    .then((result) => update(result))
    .catch(() => setActive(false));
  }, active ? interval : null);

  return [torrents];
}

export default useTorrents;