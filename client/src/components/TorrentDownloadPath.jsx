import React, { useEffect, useState } from 'react';
import getDefaultDirectory from '../libs/settings/getDefaultDirectory';
import getDownloadPaths from '../libs/settings/getDownloadPaths';

/**
 * Torrent download path form component.
 * @component
 * @param {Object} props Props containing path state
 * @returns {React.Component} TorrentDownloadPath component
 */
function TorrentDownloadPath(props) {
  // Array of torrent download directories
  const [filePaths, setFilePaths] = useState([]);
  // Default download directory path
  const [defaultPath, setDefaultPath] = useState('');

  //Retrieve download paths on render
  useEffect(() => {
    async function getPaths() {
      await Promise.all([
        getDownloadPaths(), 
        getDefaultDirectory(),
      ])
      .then((result) => {
        setFilePaths(result[0]);
        setDefaultPath(result[1]);
      })
      .catch(() => console.log('Unable to retrieve download paths'));
    }
    getPaths();
  }, []);

  return (
    <div>
      <p></p>
      Select Download Path:
      <select className="uk-select" onChange={(e) => props.path(e.target.value)}>
        <option>{`Default - ${defaultPath}`}</option>
        {filePaths.map(
          (row) => (<option key={row.id}>{`${row.name} - ${row.path}`}</option>)
        )}
      </select>
    </div>
  );
}

export default TorrentDownloadPath;

