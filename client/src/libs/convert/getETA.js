/**
 * Gives estimated completion time of torrent.
 * @param {string} completed Completed downloaded bytes 
 * @param {string} total Total size of of torrent 
 * @param {string} rate Download rate of torrent
 * @returns {string} ETA of torrent
 */
const getETA = (completed, total, rate) => {
  completed = Number(completed);
  total = Number(total);
  rate = Number(rate);
  if (rate === 0 || completed >= total) {
    return '∞';
  }
  let seconds = Math.floor(Math.abs(total - completed) / rate);
  let eta = '';
  const years = Math.floor(seconds / 31536000);
  if (years > 0) {
    seconds = Math.ceil(seconds) % 31536000;
    eta += `${years}y `;
  }
  const months = Math.floor(seconds / 2592000);
  if (months > 0) {
    seconds = Math.ceil(seconds) % 2592000;
    eta += `${months}M `;
  }
  const weeks = Math.floor(seconds / 604800);
  if (weeks > 0) {
    seconds = Math.ceil(seconds) % 604800;
    eta += `${weeks}w `;
  }
  const days = Math.floor(seconds / 86400);
  if (days > 0) {
    seconds = Math.ceil(seconds) % 86400
    eta += `${days}d `;
  }
  const hours = Math.floor(seconds / 3600);
  if (hours > 0) {
    seconds = Math.ceil(seconds) % 3600
    eta += `${hours}h `;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes > 0) {
    seconds = Math.ceil(seconds) % 60
    eta += `${minutes}m `;
  }
  eta += `${seconds}s`;
  return eta;
}

export default getETA;