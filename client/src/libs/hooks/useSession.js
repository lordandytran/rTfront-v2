import { useContext, useEffect } from 'react'
import { UserContext } from '../../components/UserContext';

/**
 * useSession maintains user authentication on 
 * browser refreshes, new tabs, logins, and logouts.
 */
const useSession = () => {
  const [, setAuthenticated] = useContext(UserContext);

  // handles login and logout on different tabs/windows
  useEffect(() => {
    window.addEventListener('storage', event => {
      const storage = sessionStorage.getItem('rtfront_session');
      // sends session token if session is valid and new request is found
      if (event.key === 'RT_NEW_REQUEST' && storage) {
        localStorage.setItem('RT_NEW_SHARE', storage);
        localStorage.removeItem('RT_NEW_SHARE');
      }
      // recieves session token from authenticated tab
      if (event.key === 'RT_NEW_SHARE' && !storage) {
        sessionStorage.setItem('rtfront_session', event.newValue);
        setAuthenticated(true);
      }
      // logs out when flush key is sent
      if (event.key === 'RT_FLUSH' && storage) {
        sessionStorage.removeItem('rtfront_session');
        setAuthenticated(false);
      }
    });
    // sends a request to other tabs on render
    localStorage.setItem('RT_NEW_REQUEST', 'EMPTY')
    localStorage.removeItem('RT_NEW_REQUEST')
  }, [setAuthenticated]);

  // handles browser refresh. Authenticates user if sessionStorage is set
  useEffect(() => {
    const storage = sessionStorage.getItem('rtfront_session');
    if (storage) {
      setAuthenticated(true);
    }
  }, [setAuthenticated]);
}

export default useSession;