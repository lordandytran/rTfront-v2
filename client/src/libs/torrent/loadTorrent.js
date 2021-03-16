import getSessionToken from '../auth/getSessionToken';
const axios = require('axios').default;

/**
 * Promise call to API to add magnet link or torrent file.
 * @param {Object} torrent Either a binary file or magnet link 
 * @param {string} torrentPath Path to download torrent 
 * @param {boolean} isMagnet Flag to determine if torrent is a magnet link
 * @returns {Promise} Promise on completion
 */
const loadTorrent = async(torrent, torrentPath, isMagnet) => 
  new Promise((resolve, reject) => {
    const storage = getSessionToken();
    // Needs to be sent as formdata to server.
    const data = new FormData();
    data.append('torrent', torrent);
    data.append('path', torrentPath.split(' - ')[1]);
    data.append('magnet', isMagnet);
    axios({
      method: 'post',
      url: '/api/rtorrent/load',
      data: data,
      headers: {
        'Authorization': `Bearer ${storage.access_token}:${storage.user_id}`,
        'Content-Type': 'multipart/form-data'
      },
    })
    .then(() => resolve())
    .catch((error) => reject(error));
});

export default loadTorrent;