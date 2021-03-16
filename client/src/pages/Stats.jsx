import React from 'react';
import { useLocation } from 'react-router-dom';
import TorrentFiles from '../components/TorrentFiles'
import TorrentPeers from '../components/TorrentPeers';
import TorrentStats from '../components/TorrentStats';
import TorrentTrackers from '../components/TorrentTrackers';
import TorrentPriority from '../components/TorrentPriority';

/**
 * Stats page.
 * @returns {React.Component} Stats page component
 */
function Stats() {
  // gets hash value from url location
  const location = useLocation();

  return (
    <div className="stats-page">
      <div className="uk-margin-top">
        {/** top tab navigation bar */}
        <ul className="uk-tab uk-flex-left" uk-switcher="connect: .switcher-container">
          <li>
            <a href="#files"><h5 className="uk-text-muted">Files</h5></a>
          </li>
          <li>
            <a href="#peers"><h5 className="uk-text-muted">Peers</h5></a>
          </li>
          <li>
            <a href="#trackers"><h5 className="uk-text-muted">Trackers</h5></a>
          </li>
        </ul>
      </div>
      <div className="uk-margin-medium-top">
        <TorrentStats hash={location.state?.hash ?? ''} />
      </div>
      <TorrentPriority hash={location.state?.hash ?? ''} />
      <div className="uk-padding-top">
        <ul className="uk-switcher switcher-container">
          <li>
            <TorrentFiles hash={location.state?.hash ?? ''} />
          </li>
          <li>
            <TorrentPeers hash={location.state?.hash ?? ''} />
          </li>
          <li>
            <TorrentTrackers hash={location.state?.hash ?? ''} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Stats;