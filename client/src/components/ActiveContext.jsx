import React, { createContext, useState } from 'react';

/**
 * ActiveContext tracks if a torrent is active.
 */
export const ActiveContext = createContext();

/**
 * ActiveProvider component provides access to
 * active context state to child components.
 * @param {Object} props Child component reciever
 * @returns {React.Component} ActiveContext provider component
 */
export const ActiveProvider = (props) => {
  const [active, setActive] = useState(true);

  // Provides access to context through child components.
  return (
    <ActiveContext.Provider value={[active, setActive]}>
      {props.children}
    </ActiveContext.Provider>
  );
}