import React from 'react';
import removeDownloadPath from '../libs/settings/removeDownloadPath';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

/**
 * Lists current download directories and allows removal.
 * @component
 * @param {Object} props Props containing list of directories and update event
 * @param {Array} props.list Array of download directories
 * @param {React.Dispatch} props.update Dispatch to indicate list update
 * @returns {React.Component} CurrentDirectories component
 */
function CurrentDirectories(props) {

  function removeLocation(event) {
    const notyf = new Notyf();
    removeDownloadPath(Number(event.currentTarget.name))
      .then(() => {
        // Triggers update event of list on delete
        props.update(prev => !prev);
        notyf.success('Removed location successfully.');
      })
      .catch(() => notyf.error('Error removing location.'));
  }

  return (
    <>
      <h5 className="uk-card-title">Current Directories</h5>
      {/** table of download directories and delete option */}
      <table className="uk-table uk-table-divider">
        <thead>
          <tr>
            <th>Name</th>
            <th>Path</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((value, index) => {
            return (
              <tr key={index}>
                <td>{value.name}</td>
                <td>{value.path}</td>
                <td>
                  <a 
                    href="#delete" 
                    name={value.id} 
                    onClick={removeLocation} 
                    style={{ color: '#f0506e' }}
                  >
                    <i className="fa fa-times"></i>
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default CurrentDirectories;