import React, { useEffect, useState } from 'react'
import addTracker from '../libs/torrent/addTracker'
import listTrackers from '../libs/torrent/listTrackers';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

/**
 * Lists and provides update form of torrent trackers.
 * @component
 * @param {object} props Props containing hash value of torrent
 * @param {string} props.hash Hash value of torrent
 * @returns {React.Component} TorrentTrackers component
 */
function TorrentTrackers(props) {
  const [update, setUpdate] = useState(true);
  const [trackers, setTrackers] = useState([]);
  const [url, setURL] = useState('');

  // gets list of trackers on render. fires when update is changed
  useEffect(() => {
    listTrackers(props.hash)
      .then((result) => setTrackers(result))
      .catch(() => console.log('Unable to retrieve trackers'))
  }, [props.hash, update]);

  function submitTracker(event) {
    event.preventDefault();
    const notyf = new Notyf();
    addTracker(props.hash, trackers.length, url)
      .then(() => {
        // rerender component to update list
        setUpdate((prev) => !prev);
        notyf.success('Tracker Added');
      })
      .catch(() => notyf.error('Unable to add tracker.'));
  }

  return (
    <div className="uk-margin-large-left uk-margin-large-top uk-margin-large-right">
      <p className="uk-text-large uk-text-primary">Trackers</p>
      <div className="uk margin">
        <form onSubmit={submitTracker}>
          Add Tracker:&nbsp;&nbsp; 
          <div uk-form-custom="target: true">
            <input required
              type="text"
              className="uk-input uk-width-large"
              placeholder="URL"
              value={url}
              onChange={e => setURL(e.target.value)}
            />
          </div>
          <button className="uk-button uk-button-primary">Submit</button>
        </form>
      </div>
      <table className="uk-table uk-table-small uk-table-responsive uk-table-divider">
        <thead>
          <tr>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {trackers.map((value, index) => {
            return (
              <tr key={index}>
                <td>{value.url}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TorrentTrackers;