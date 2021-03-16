import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { ActiveContext } from './ActiveContext';
import loadTorrent from '../libs/torrent/loadTorrent';
import TorrentDownloadPath from './TorrentDownloadPath';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

/**
 * Modal containing add torrent form.
 * @component
 * @returns {React.Component} AddTorrentModal component
 */
function AddTorrentModal() {
  const history = useHistory();
  const [,setActive] = useContext(ActiveContext);
  // values for controlled inputs
  const [magnet, setMagnet] = useState('');
  const [file, setFile] = useState(null);
  const [torrentPath, setTorrentPath] = useState('');

  // submits torrent. Closes modal on success. Gives error toast on failure.
  async function submitTorrent(event) {
    event.preventDefault();
    const notyf = new Notyf();
    const link = file ?? magnet;
    await loadTorrent(link, torrentPath, file === null)
      .then(() => {
        document.getElementById('exit-add-modal').click();
        // trigger active context and useActivity hook to update
        setActive(false);
        setActive(true);
        localStorage.setItem('RT_TORRENT_EVENT', 'EMPTY');
        localStorage.removeItem('RT_TORRENT_EVENT');
        history.push('/');
      })
      .catch((e) => notyf.error('Error creating torrent.'));
  }

  return (
    <div className="uk-modal-dialog">
      <button 
        className="uk-modal-close-default" 
        type="button" 
        uk-close="true" 
        id="exit-add-modal">
      </button>
      <form onSubmit={submitTorrent} encltype="multipart/form-data">
        <div className="uk-modal-body">
          {/** add torrent file and magnet link split into tabs. */}
          <ul className="uk-tab" uk-switcher="connect: .switcher-container">
            <li>
              <a href="#magnet">Add Magnet Link</a>
            </li>
            <li>
              <a href="#file">Add Torrent File</a>
            </li>
          </ul>
          <ul className="uk-switcher switcher-container">
            <li>
              {/** add magnet link form. */}
              <input
                className="uk-input"
                type="text"
                placeholder="Paste magnet link"
                value={magnet}
                onChange={(e) => setMagnet(e.target.value)}
              />
            </li>
            <li>
              {/** add torrent file form. */}
              <input
                className="uk-input"
                type="file"
                accept=".torrent"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </li>
          </ul>
          {/** torrent path form. Setter sent as prop. */}
          <TorrentDownloadPath path={setTorrentPath} />
        </div>
        <div className="uk-modal-footer uk-text-right">
          <button 
            className="uk-button uk-button-default uk-modal-close" 
            type="button">
              Cancel
          </button>
          <button 
            className="uk-button uk-button-primary" 
            type="submit">
              Add Torrent
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTorrentModal;