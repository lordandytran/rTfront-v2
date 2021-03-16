import getAuthHeader from '../auth/getAuthHeader';
import convertBytes from '../convert/convertBytes';
const axios = require('axios').default;

/**
 * Promise call to API to retrieve all peer information of a torrent.
 * @param {string} hash Hash value of torrent
 * @returns {Promise} Promise returning error message on failure
 * and a hash-keyed object of peer information on success
 */
const listPeers = (hash) => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: `/api/rtorrent/peers/${hash}`,
    headers: getAuthHeader()
  })
  .then((result) => {
    let data = result.data;
    let peers = {};
    data.forEach((peer) => {
      peers[peer[0]] = {
        ip: peer[1],
        port: peer[2],
        client: peer[3],
        completed: peer[4],
        downrate: `${convertBytes(peer[5])}/s`,
        uprate: `${convertBytes(peer[6])}/s`,
      }
    });
    resolve(peers);
  })
  .catch((error) => reject(error));
});

export default listPeers;