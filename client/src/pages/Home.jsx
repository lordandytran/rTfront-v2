import React from 'react';
import AddTorrentButton from '../components/AddTorrentButton';
import ControlButtons from '../components/ControlButtons';
import TorrentList from '../components/TorrentList';
import { HashProvider } from '../components/HashContext';

/**
 * Home page. Contains torrent list and control buttons.
 * @returns {React.Component} Home component
 */
function Home() {

  return (
    <div className="home-page">
      <HashProvider>
        <div className="uk-margin-top uk-flex uk-flex-right" uk-sticky="true">
          <ControlButtons />
          <AddTorrentButton />
        </div>
        <TorrentList view="main" />
      </HashProvider>
    </div>
  );
}

export default Home;