import React from 'react'
import listFiles from '../libs/torrent/listFiles';
import TorrentFilePriority from './TorrentFilePriority';
import useList from '../libs/hooks/useList';

/**
 * Table containing file information of torrent.
 * @component
 * @param {Object} props Props containing torrent hash value
 * @returns {React.Component} TorrentFiles component
 */
function TorrentFiles(props) {
  // useList hook updates files using list function from module
  const [files] = useList(props.hash, listFiles);

  return (
    <div className="uk-margin-large-left uk-margin-large-top uk-margin-large-right">
      <p className="uk-text-large uk-text-primary">Files</p>
      <table className="uk-table uk-table-small uk-table-responsive uk-table-divider">
        <thead>
          <tr>
            <th>Name</th>
            <th>Path</th>
            <th>Size</th>
            <th>Completed</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(files).map(([index, value]) => {
            return (
              <tr key={index}>
                <td>{value.name}</td>
                <td><span className="uk-text-break">{value.path}</span></td>
                <td>{value.size}</td>
                <td>{`${value.completed}%`}</td>
                <td>
                  <TorrentFilePriority 
                    hash={props.hash}
                    priority={value.priority}
                    index={index}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TorrentFiles;