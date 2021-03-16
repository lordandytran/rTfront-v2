import getAuthHeader from '../auth/getAuthHeader';
const axios = require('axios').default;

/**
 * Promise call to API to get torrent settings.
 * @param {string} type Type of setting 
 * 'minratio' || 'maxration' || 'upload' || 'download'
 * @returns {Promise} Promise returning error message on failure
 * and setting value on success
 */
export const getRates = (type) => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: `/api/rtorrent/settings/${type}`,
    headers: getAuthHeader(),
  })
  .then((result) => resolve(result.data))
  .catch((error) => reject(error));
});

export default getRates;