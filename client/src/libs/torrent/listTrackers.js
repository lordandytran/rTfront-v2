import getAuthHeader from '../auth/getAuthHeader';
const axios = require('axios').default;

/**
 * Promise call to API to get list of torrent trackers.
 * @param {string} hash Hash value of torrent
 * @returns {Promise} Promise returning error message on failure
 * and array of trackers on success
 */
const listTrackers = (hash) => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: `/api/rtorrent/trackers/${hash}`,
    headers: getAuthHeader()
  })
  .then((result) => {
    const data = result.data;
    let trackers = [];
    data.forEach((tracker) => {
      trackers.push({
        url: tracker[0],
      });
    });
    resolve(trackers);
  })
  .catch((error) => reject(error));
});

export default listTrackers;