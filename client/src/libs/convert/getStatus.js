/**
 * Returns the torrent status.
 * @param {string} active If torrent is active
 * @param {string} complete if torrent is complete
 * @param {string} hashing If torrent is hashing
 * @param {string} open If torrent is open
 * @param {string} state State of torrent 
 * @returns {string} Torrent status string
 */
const getStatus = (active, complete, hashing, open, state) => {
  let result = 'N/A';
  if (hashing !== '0') {
    result = 'Hashing';
  }
  else if (open === '0' && active === '0') {
    result = 'Closed';
  }
  else if (open === '1' && active === '0' && state === '0') {
    result = 'Stopped';
  }
  else if (open === '1' && active === '0' && state === '1') {
    result = 'Paused';
  }
  else if (open === '1' && active === '1' && state === '1') {
    result = complete === '1' ? 'Seeding' : 'Leeching';
  }
  return result;
}

export default getStatus;