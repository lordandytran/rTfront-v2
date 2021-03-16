import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ActiveContext } from './ActiveContext';
import { HashContext } from './HashContext';
import useTorrents from '../libs/hooks/useTorrents';

/**
 * Table listing torrents and information.
 * @component
 * @param {Object} props props containing view of rtorrent
 * @param {string} props.view rtorrent view 
 * @returns {React.Component} TorrentList component
 */
function TorrentList(props) {
  const [torrents] = useTorrents(props.view);
  const [active] = useContext(ActiveContext);
  // sets selected hashes from checkboxes
  const [hashes, setHashes] = useContext(HashContext);

  // resets all inputs when event is fired
  useEffect(() => {
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
    for(let checkbox of checkboxes) {
      checkbox.checked = false;
    }
    setHashes(new Set());
  }, [active, setHashes]);

  // checks all checkboxes and puts all hashes in context
  function checkAll(checked) {
    let checkboxes = document
      .querySelectorAll('input[name=select-torrent-checkbox]');
    for (let checkbox of checkboxes) {
      checkbox.checked = checked;
      check(checkbox);
    }
  }

  // puts or removes hash in context when checked 
  function check(target) {
    if (target.checked) {
      setHashes((prev) => new Set(prev.add(target.id)));
    }
    else {
      let set = hashes;
      set.delete(target.id);
      setHashes(new Set(set));
    }
  }

  return (
    <div className="torrent-list uk-overflow-auto uk-margin-left uk-margin-right uk-margin-top">
      <table className="uk-table uk-table-small uk-table-responsive uk-table-divider">
        <thead>
          <tr>
            <th>
              <input
                id="select-all"
                className="uk-checkbox"
                type="checkbox"
                onChange={(e) => checkAll(e.currentTarget.checked)}
              />
            </th>
            <th>Name</th>
            <th>Status</th>
            <th>Complete</th>
            <th>Size</th>
            <th>ETA</th>
            <th>Down</th>
            <th>Up</th>
            <th>Ratio</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(torrents).map(([hash, value]) => {
            return (
              <tr key={hash}>
                <td>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    name="select-torrent-checkbox"
                    id={hash}
                    onChange={(e) => check(e.currentTarget)}
                  />
                  <span className="uk-hidden@m">&nbsp;Select</span>
                </td>
                <td>
                  <Link 
                    className="uk-text-break" 
                    to={{
                      pathname:`/stats/${hash}`, 
                      state: {hash: hash}
                    }}>{value.name}
                  </Link>
                </td>
                <td>{value.status}</td>
                <td 
                  uk-tooltip={
                    `${Number.parseFloat(value.complete * 100).toFixed(2)}%`
                  }>
                  <progress
                    className="uk-progress"
                    value={Math.floor(value.complete * 100)}
                    max="100">
                  </progress>
                </td>
                <td>{`${value.completedBytes} / ${value.size}`}</td>
                <td>
                  <span 
                    className="uk-hidden@m uk-text-bold">eta:&nbsp;
                  </span>{value.eta}
                </td>
                <td>
                  <span 
                    className="uk-hidden@m uk-text-bold">down:&nbsp;
                  </span>{value.downrate}
                </td>
                <td>
                  <span 
                    className="uk-hidden@m uk-text-bold">up:&nbsp;
                  </span>{value.uprate}
                </td>
                <td>
                  <span 
                    className="uk-hidden@m uk-text-bold">ratio:&nbsp;
                  </span>{value.ratio}
                </td>
                <td>
                  <span 
                    className="uk-hidden@m uk-text-bold">priority:&nbsp;
                  </span>{value.priority}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TorrentList;