import getAuthHeader from '../auth/getAuthHeader';
const axios = require('axios').default;

/**
 * Promise call to API to set torrent settings.
 * @param {string} type Type of setting 
 * 'minratio' || 'maxration' || 'upload' || 'download'
 * @param {*} setting Update value
 * @returns {Promise} Promise returning error message on failure
 * and resolve on success
 */
const setRates = (type, setting) => new Promise((resolve, reject) => {
  axios({
    method: 'put',
    url: `/api/rtorrent/settings/${type}`,
    data: {
      [type]: setting,
    },
    headers: getAuthHeader(),
  })
  .then(() => resolve())
  .catch((error) => reject(error));
});

export default setRates