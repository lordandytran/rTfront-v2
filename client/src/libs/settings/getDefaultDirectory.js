import getAuthHeader from '../auth/getAuthHeader';
const axios = require('axios').default;

/**
 * Promise call to API to get default download directory.
 * @returns {Promise} Promise returning error message on failure
 * and the default directory on success
 */
const getDefaultDirectory = () => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: '/api/rtorrent/directory',
    headers: getAuthHeader(),
  })
  .then((result) => resolve(result.data))
  .catch(() => reject('Unable to retrieve default download path.'));
});

export default getDefaultDirectory;