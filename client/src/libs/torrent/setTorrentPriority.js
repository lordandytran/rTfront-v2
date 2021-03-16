import getAuthHeader from '../auth/getAuthHeader';
const axios = require('axios').default;

/**
 * Promise call to API to set torrent priority.
 * @param {string} hash Hash value of torrent 
 * @param {number} prioirity Priority of torrent
 * @returns {Promise} Promise returning error message on failure
 * and resolve on success
 */
const setTorrentPriority = (hash, priority) => new Promise((resolve, reject) => {
  axios({
    method: 'put',
    url: '/api/rtorrent/settings/priority',
    data: {
      hash: hash,
      priority: Number(priority),
    },
    headers: getAuthHeader(),
  })
  .then(() => resolve())
  .catch((error) => reject(error));
});

export default setTorrentPriority;