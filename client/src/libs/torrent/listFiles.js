import getAuthHeader from '../auth/getAuthHeader';
import convertBytes from '../convert/convertBytes';
import getPriorityString from '../convert/getPriorityString';
const axios = require('axios').default;

/**
 * Promise call to API to list all file information in torrent
 * @param {string} hash Hash value of torrent
 * @returns {Promise} Promise returns error message on failure
 * and object of file information on success 
 */
const listFiles = (hash) => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: `/api/rtorrent/files/${hash}`,
    headers: getAuthHeader(),
  })
  .then((result) => {
    const data = result.data;
    let files = {};
    data.forEach((file, index) => {
      files[index] = {
        name: file[1].substring(file[1].lastIndexOf('/') + 1),
        fullPath: file[1],
        path: file[1].substring(0, file[1].lastIndexOf('/') + 1),
        size: convertBytes(file[2]),
        completed: parseFloat((Number(file[3]) / Number(file[4])) * 100)
          .toFixed(2),
        priority: getPriorityString('file', file[5]),
      }
    });
    resolve(files);
  })
  .catch((error) => reject(error));
});

export default listFiles;