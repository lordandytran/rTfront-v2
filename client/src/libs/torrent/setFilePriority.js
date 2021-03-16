import getAuthHeader from '../auth/getAuthHeader';
const axios = require('axios').default;

/**
 * Promise call to API to update file priority of torrent.
 * @param {string} hash Hash of torrent
 * @param {Number} file File index
 * @param {Number} priority New priority of file
 * @returns Promise returning error message on failure
 * and reolve on success
 */
const setFilePriority = (hash, file, priority) => new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: '/api/rtorrent/files/priority',
    data: {
      hash,
      file,
      priority,
    },
    headers: getAuthHeader(),
  })
  .then(() => resolve())
  .catch((error) => reject(error));
});

export default setFilePriority;