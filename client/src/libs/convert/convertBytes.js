/**
 * Converts number of bytes to its string representation.
 * @param {string} bytes String representing number of bytes 
 * @returns {string} String conversion of bytes
 */
const convertBytes = (bytes) => {
  let size = Number(bytes);
  return size >= 1099511627776 
    ? `${Number.parseFloat(size / 1099511627776).toFixed(1)} TB`
    : size >= 1073741824 
    ? `${Number.parseFloat(size / 1073741824).toFixed(1)} GB`
    : size >= 1048576 
    ? `${Number.parseFloat(size / 1048576).toFixed(1)} MB`
    : size >= 1024 ? `${Math.ceil(size / 1024)} KB`
    : `${size} bytes`;
}

export default convertBytes;