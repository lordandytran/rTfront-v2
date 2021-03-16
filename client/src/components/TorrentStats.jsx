import React, { useState } from 'react';
import useTorrents from '../libs/hooks/useTorrents';

/**
 * Lists detailed torrent information.
 * @param {Object} props Props containing torrent hash value
 * @param {string} props.hash Hash value of torrent 
 * @returns {React.Component} TorrentStats component
 */
function TorrentStats(props) {
  const [hash] = useState(props.hash);
  const [torrents] = useTorrents('main');

  return (
    <div className="torrent-stats">
      {torrents.hasOwnProperty(hash) ? (
        <div className="uk-margin-large-left uk-margin-large-right">
          <p className="uk-text-lead uk-text-break">{torrents[hash].name}</p>
          <hr></hr>
          <p className="uk-text-large uk-text-primary">Torrent Status</p>
          <p>
            <span>{torrents[hash].status}</span>
            <span 
              className="uk-margin-small-right uk-margin-small-left">&bull;
            </span>
            <span>
              {`${parseFloat(torrents[hash].complete * 100).toFixed(2)}%`}
            </span>
            <span 
              className="uk-margin-small-right uk-margin-small-left">&bull;
            </span>
            <span uk-icon="icon: arrow-down"></span>{torrents[hash].downrate}
            <span 
              className="uk-margin-small-right uk-margin-small-left">&bull;
            </span>
            <span uk-icon="icon: arrow-up"></span>{torrents[hash].uprate}
            <span 
              className="uk-margin-small-right uk-margin-small-left">&bull;
            </span>
            <span uk-icon="icon: future"></span>&nbsp;{torrents[hash].eta}
            <span 
              className="uk-margin-small-right uk-margin-small-left">&bull;
            </span>
            <span>
              {torrents[hash].peersConnected} ({torrents[hash].totalPeers}) peers
            </span>
            <span 
              className="uk-margin-small-right uk-margin-small-left">&bull;
            </span>
            <span>ratio: {torrents[hash].ratio}</span>
            <span 
              className="uk-margin-small-right uk-margin-small-left">&bull;
            </span>
            <span>priority: {torrents[hash].priority}</span>
          </p>
        </div>) : (<></>)
      }
    </div>
  );
}

export default TorrentStats;