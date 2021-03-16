import convertBytes from '../convert/convertBytes';
import getAuthHeader from '../auth/getAuthHeader';
import getPriorityString from '../convert/getPriorityString';
import getETA from '../convert/getETA';
import getStatus from '../convert/getStatus';
const axios = require('axios').default;

/**
 * Promise call to API to list all torrent information.
 * @param {string} view View of rtorrent
 * @returns {Promise} Promise returning error code on failure
 * and hash-keyed object containing torrent information on success
 */
const listTorrents = (view) => new Promise((resolve, reject) => {
  let url = `/api/rtorrent/list/${view}`;
  axios({
    method: 'get',
    url: url,
    headers: getAuthHeader(),
  })
  .then((result) => {
    const torrent = result.data;
    let torrents = {};
    // array of torrents are recieved in reverse order
    torrent.reverse().forEach((val) => {
      torrents[val[0]] = {
        name: val[1],
        size: convertBytes(val[7]),
        status: getStatus(val[2], val[5], val[6], val[3], val[4]),
        complete: parseFloat(Number(val[8]) / Number(val[7])).toFixed(4),
        completedBytes: convertBytes(val[8]),
        eta: getETA(val[8], val[7], val[9]),
        downrate: `${convertBytes(val[9])}/s`,
        uprate: `${convertBytes(val[10])}/s`,
        ratio: parseFloat(Number(val[12]) / 1000).toFixed(2),
        priority: getPriorityString('torrent', val[13]),
        totaldown: val[11],
        peersConnected: val[14],
        totalPeers: Number(val[14]) + Number(val[15]),
        leechers: val[16],
        seeders: val[17],
      }
    });
    resolve(torrents);
  })
  .catch((error) => reject(error));
});

export default listTorrents;