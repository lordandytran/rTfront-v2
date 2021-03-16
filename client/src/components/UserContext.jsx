import React, { createContext, useEffect, useState } from 'react';

/**
 * UserContext tracks if a user is authenticated.
 */
export const UserContext = createContext();

/**
 * UserProvider component provides access to
 * user context state to children components. 
 * @component
 * @param {Object} props Child component reciever
 * @returns {React.Component} UserContext provider component
 */
export const UserProvider = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  
  // Reauthenticate on browser refresh.
  useEffect(() => {
    const storage = sessionStorage.getItem('rtfront_session');
    if (storage) {
      setAuthenticated(true);
    }
  }, []);

  // Provides access to context through child components.
  return (
    <UserContext.Provider value={[authenticated, setAuthenticated]}>
      {props.children}
    </UserContext.Provider>
  );
}