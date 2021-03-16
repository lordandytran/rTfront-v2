import React from 'react';
import AddTorrentModal from './AddTorrentModal';

/**
 * Add button component that fires the AddTorrentModal component.
 * @component
 * @returns {React.Component} AddTorrentButton component
 */
function AddTorrentButton() {

  return (
    <div className="add-torrent-buttons uk-flex uk-margin-right">
      <button
        className="uk-button uk-button-primary" 
        uk-toggle="target: #add-torrent">
        Add
      </button>
      <div id="add-torrent" uk-modal="true" container="false">
        <AddTorrentModal />
      </div>
    </div>
  );
}

export default AddTorrentButton;