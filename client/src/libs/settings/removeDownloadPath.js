import getAuthHeader from '../auth/getAuthHeader';
const axios = require('axios').default;

/**
 * Promise call to API to remove download path.
 * @param {number} index id of download path 
 * @returns {Promise} Promise returning error message on failure
 * and resolve on success
 */
const removeDownloadPath = (index) => new Promise((resolve, reject) => {
  axios({
    method: 'delete',
    url: '/api/system/paths',
    data: {
      key: index,
    },
    headers: getAuthHeader(),
  })
  .then(() => resolve())
  .catch(() =>  reject('Unable to create download path.'));
});

export default removeDownloadPath;