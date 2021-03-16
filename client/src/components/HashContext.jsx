import React, { createContext, useState } from 'react';

/**
 * HashContext tracks selected torrents from TorrentList component.
 */
export const HashContext = createContext();

/**
 * HashProvider component provides access to
 * hash context state to child components.
 * @param {Object} props Child component reciever
 * @returns {React.Component} HashContext provider component
 */
export const HashProvider = (props) => {
  const [hashes, setHashes] = useState(new Set());
  return (
    <HashContext.Provider value={[hashes, setHashes]}>
      {props.children}
    </HashContext.Provider>
  );
}