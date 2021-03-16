import getAuthHeader from '../auth/getAuthHeader';
const axios = require('axios').default;

/**
 * Promise call to API to create download path.
 * @param {string} name Name of download path
 * @param {string} path Path for new downloads
 * @returns {Promise} Promise returning error message on failure
 * and resolve on success
 */
const createDownloadPath = (name, path) => new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: '/api/system/paths',
    data: {
      name: name,
      path: path,
    },
    headers: getAuthHeader(),
  })
  .then(() => resolve())
  .catch(() => reject('Unable to create download path.'));
});

export default createDownloadPath;