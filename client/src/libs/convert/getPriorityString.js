/**
 * Converts number value to its priority, given a type.
 * @param {string} type Type: 'torrent' || 'file'
 * @param {string} priority Priority number
 * @returns {string} Priority of given type
 */
const getPriorityString = (type, priority) => {
  if (type === 'torrent')
    return priority === '0' ? 'Off'
      : priority === '1' ? 'Low'
      : priority === '2' ? 'Normal'
      : priority === '3' ? 'High'
      : 'N/A';
  else
    return priority === '0' ? 'Off'
      : priority === '1' ? 'Normal'
      : priority === '2' ? 'High'
      : 'N/A';
}

export default getPriorityString;