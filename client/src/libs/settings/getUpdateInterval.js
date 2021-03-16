import getAuthHeader from '../auth/getAuthHeader';
const axios = require('axios').default;

/**
 * Promise call to API to get torrent update interval.
 * @returns {Promise} Promise returning error message on failure
 * and update interval on success
 */
const getUpdateInterval = () => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: '/api/system/interval',
    headers: getAuthHeader(),
  })
  .then((result) => resolve(result.data.data))
  .catch(() => {
    reject({
      message: 'Unable to retrieve update interval. Defaulting to 5 seconds.',
      data: 5000,
    });
  });
});

export default getUpdateInterval;