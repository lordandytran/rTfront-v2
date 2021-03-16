import getAuthHeader from '../auth/getAuthHeader';
const axios = require('axios').default;

/**
 * Promise call to API to retrieve download paths.
 * @returns {Promise} Promise returning array of download paths on success
 * and error message on failure
 */
const getDownloadPaths = () => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: '/api/system/paths',
    headers: getAuthHeader(),
  })
  .then((result) => resolve(result.data.data))
  .catch(() => reject('Unable to retrieve download paths.'));
});

export default getDownloadPaths;