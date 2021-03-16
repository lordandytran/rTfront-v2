import React, { useContext } from 'react';
import { ActiveContext } from './ActiveContext';
import { HashContext } from './HashContext';
import controlTorrent from '../libs/torrent/controlTorrent';

/**
 * Component contains play, pause, stop, and delete controls for torrents.
 * @component
 * @returns {React.Component} ControlButtons component
 */
function ControlButtons() {
  // fires active context when button is pressed
  const [, setActive] = useContext(ActiveContext);
  // contains selected hashes from TorrentList component
  const [hashes] = useContext(HashContext);

  async function controlClick(event) {
    if (hashes.size === 0) {
      return;
    }
    // calls control api call for each selected torrent
    await Promise.all([...hashes].map(hash => {
      return ([controlTorrent(event.currentTarget.name, hash)]);
    }))
    .catch((error) => console.log(error))
    .then(() => {
      // trigger active context and useActivity hook to update
      setActive(false);
      setActive(true);
      localStorage.setItem('RT_TORRENT_EVENT', 'EMPTY');
      localStorage.removeItem('RT_TORRENT_EVENT');
    });
  }

  return (
    <div className="control-torrent-buttons uk-margin-right uk-margin-left">
      <ul className="uk-iconnav uk-margin-small-top">
        <li className="uk-margin-small-right">
          <a href="#play" name="start" onClick={controlClick}>
            <i className="fa fa-play"></i>
          </a>
        </li>
        <li className="uk-margin-small-right">
          <a href="#pause" name="pause" onClick={controlClick}>
            <i className="fa fa-pause"></i>
          </a>
        </li>
        <li className="uk-margin-small-right">
          <a href="#stop" name="stop" onClick={controlClick}>
            <i className="fa fa-stop"></i>
          </a>
        </li>
        <li>
          <a href="#delete" name="delete" onClick={controlClick}>
            <i className="fa fa-trash"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default ControlButtons;