import getAuthHeader from '../auth/getAuthHeader';
const axios = require('axios').default;

/**
 * Promise call to API to control torrents.
 * @param {string} method play, pause, stop, or delete
 * @param {string} hash Hash value of torrent
 * @returns {Promise} Promise returning error message on failure
 * and resolves on success
 */
const controlTorrent = (method, hash) => new Promise((resolve, reject) => {
  axios({
    method: method === 'delete' ? 'delete' : 'post',
    url: `/api/rtorrent/control/${method}`,
    data: {
      hash: hash,
    },
    headers: getAuthHeader(),
  })
  .then(() => resolve())
  .catch((error) => reject(error));
});

export default controlTorrent;