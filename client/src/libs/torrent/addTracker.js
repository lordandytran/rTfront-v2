import getAuthHeader from '../auth/getAuthHeader';
const axios = require('axios').default;

/**
 * Promise call to API to add tracker to torrent.
 * @param {string} hash Hash value torrent
 * @param {string} index Index of added tracker
 * @param {string} tracker Tracker to be added 
 * @returns {Promise} Promise returning an error message on failure
 * and resolve on success
 */
export const addTracker = (hash, index, tracker) => new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: '/api/rtorrent/trackers/add',
    data: {
      hash: hash,
      index: index,
      tracker: tracker,
    },
    headers: getAuthHeader()
  })
  .then(() => resolve())
  .catch((error) => reject(error));
});

export default addTracker;