import React from 'react'
import listPeers from '../libs/torrent/listPeers';
import useList from '../libs/hooks/useList';

/**
 * Table listing torrent peer information.
 * @param {Object} props Props containing torrent hash
 * @param {string} props.hash Hash value of torrent
 * @returns {React.Component} TorrentPeers component
 */
function TorrentPeers(props) {
  const [peers] = useList(props.hash, listPeers);

  return (
    <div className="uk-margin-large-left uk-margin-large-top uk-margin-large-right">
      <p className="uk-text-large uk-text-primary">Peers</p>
      <table className="uk-table uk-table-small uk-table-responsive uk-table-divider">
        <thead>
          <tr>
            <th>IP</th>
            <th>Port</th>
            <th>Client</th>
            <th>Completed</th>
            <th>Down</th>
            <th>Up</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(peers).map(([hash, value]) => {
            return (
              <tr key={hash}>
                <td>{value.ip}</td>
                <td>{value.port}</td>
                <td>{value.client}</td>
                <td>{`${value.completed}%`}</td>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TorrentPeers;