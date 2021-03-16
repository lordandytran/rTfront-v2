import React, { useState } from 'react';
import setTorrentPriority from '../libs/torrent/setTorrentPriority';
import useActivity from '../libs/hooks/useActivity';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

/**
 * Form to list and set the priority of a torrent.
 * @component
 * @param {Object} props Props containing hash value of torrent
 * @param {string} props.hash Hash value of torrent
 * @returns {React.Component} TorrentPriority component
 */
function TorrentPriority(props) {
  // updates any sessions torrents when eveent occurs
  useActivity();
  const [hash] = useState(props.hash);
  const [priority, setPriority] = useState('DEFAULT')

  function submitPriority(event) {
    event.preventDefault();
    const notyf = new Notyf();
    if (priority !== 'DEFAULT') {
      setTorrentPriority(hash, priority)
      .then(() => {
        // sets active context by firing off useActivity
        localStorage.setItem('RT_TORRENT_EVENT', 'EMPTY');
        localStorage.removeItem('RT_TORRENT_EVENT');
        notyf.success('Priority changed!');
      })
      .catch(() => notyf.error('Unable to set priority.'));
    }
  }

  return (
    <div className="change-priority">
      <div className="uk-margin-large-top uk-margin-large-left uk-margin-large-right">
        <form onSubmit={submitPriority}>
          <div className="uk-flex uk-flex-left">
            <label>
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)} 
                className="uk-select" 
                style={{ width: '100%' }}
              >
                <option 
                  disabled 
                  value="DEFAULT">Change Priority&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </option>
                <option value="0">Off</option>
                <option value="1">Low</option>
                <option value="2">Normal</option>
                <option value="3">High</option>
              </select>
            </label>
            <button className="uk-button uk-button-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TorrentPriority;