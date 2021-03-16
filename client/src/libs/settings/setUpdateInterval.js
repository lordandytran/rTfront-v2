import getAuthHeader from '../auth/getAuthHeader';
const axios = require('axios').default;

/**
 * Promise call to API to set torrent update interval.
 * @param {number} interval Update interval in ms
 * @returns {Promise} Promise returning error message on failure
 * and resolve on success
 */
const setUpdateInterval = (interval) => new Promise((resolve, reject) => {
  axios({
    method: 'put',
    url: '/api/system/interval',
    data: {
      interval: interval,
    },
    headers: getAuthHeader(),
  })
  .then(() => resolve())
  .catch((error) => reject(error));
});

export default setUpdateInterval;