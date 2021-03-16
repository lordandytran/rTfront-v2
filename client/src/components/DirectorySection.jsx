import React, { useEffect, useState } from 'react';
import CurrentDirectories from './CurrentDirectories';
import createDownloadPath from '../libs/settings/createDownloadPath';
import getDownloadPaths from '../libs/settings/getDownloadPaths';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

/**
 * Forms that allow creation and deletion of torrent download directories.
 * @returns {React.Component} DirectorySection component
 */
function DirectorySection() {
  const [change, setChange] = useState(true);
  const [directories, setDirectories] = useState([]);
  const [name, setName] = useState('');
  const [path, setPath] = useState('');

  // retrieves download paths on render and when change state is modified.
  useEffect(() => {
    getDownloadPaths()
    .then((result) => setDirectories(result))
    .catch(() => console.log('Unable to retrieve donwload paths'));
  }, [change]);

  function formSubmit(event) {
    event.preventDefault();
    const notyf = new Notyf();
    createDownloadPath(name, path)
    .then(() => {
      setPath('');
      setName('');
      // forces update of directory list on change
      setChange((prev) => !prev);
      notyf.success('Success!.');
    })
    .catch(() => notyf.error('Unable to create download path.'));
  }

  return (
    <div className="uk-card uk-card-default uk-card-body">
      <h5 className="uk-card-title">Set Download Directories</h5>
      <form onSubmit={formSubmit}>
        <div className="uk-margin">
          <input required
            className="uk-input"
            type="text"
            placeholder="Choose Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="uk-margin">
          <input required
            className="uk-input"
            type="text"
            placeholder="Set Path"
            value={path}
            onChange={(e) => setPath(e.target.value)}
          />
        </div>
        <button 
          className="uk-button uk-button-primary" 
          type="submit">Submit
        </button>
      </form>
      <CurrentDirectories list={directories} update={setChange} />
    </div>
  )
}

export default DirectorySection;