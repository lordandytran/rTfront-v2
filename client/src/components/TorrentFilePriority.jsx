import React, { useContext } from 'react'
import setFilePriority from '../libs/torrent/setFilePriority';
import { ActiveContext } from './ActiveContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

/**
 * Dropdown form to select torrent file priority.
 * @component
 * @param {Object} props Props containing torrent file information
 * @param {string} props.hash Hash value of torrent
 * @param {string} props.index Index of torrent file
 * @param {string} props.priority Priority value of torrent file
 * @returns {React.Component} TorrentFilePriority component
 */
function TorrentFilePriority(props) {
  const [,setActive] = useContext(ActiveContext)

  function changePriority(index, value) {
    const notyf = new Notyf();
    setFilePriority(props.hash, Number(index), Number(value))
    .then(() => {
      setActive(false);
      setActive(true);
      localStorage.setItem('RT_TORRENT_EVENT', 'EMPTY');
      localStorage.removeItem('RT_TORRENT_EVENT');
      document.getElementById(`select-${index}`).value = 'DEFAULT';
      notyf.success('File priority changed!')
    })
    .catch(() => notyf.error('Error changing file priority.'));
  }

  return (
    <select
      classname="uk-select"
      id={`select-${props.index}`}
      value="DEFAULT"
      onChange={(e) => {
        changePriority(props.index, e.target.value);
      }}>
      <option
        disabled
        value="DEFAULT">Current Priority: {props.priority}&nbsp;
                    </option>
      <option value="0">Off</option>
      <option value="1">Normal</option>
      <option value="2">High</option>
    </select>
  )
}

export default TorrentFilePriority;