import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ActiveProvider } from './components/ActiveContext';
import Routes from './components/Routes';
import useSession from './libs/hooks/useSession';
import { UserContext } from './components/UserContext';
import logout from './libs/auth/logout'

/**
 * Contains the top navbar and Routes component.
 * @component
 * @returns {React.Component} App component
 */
function App() {
  // handles any user session
  useSession();
  const history = useHistory();
  const [authenticated, setAuthenticated] = useContext(UserContext);

  // resets the user context and flushes any other sessions opened.
  function handleLogout() {
    logout().catch(() => console.log('Error with logout.'))
    .then(() => {
        localStorage.setItem('RT_FLUSH', 'EMPTY');
        localStorage.removeItem('RT_FLUSH');
        setAuthenticated(false);
        history.push('/login');
    });
  }

  return (
    <div className="App">
      <nav className="uk-background-primary" uk-navbar="true">
        <div className="uk-navbar-left">
          <Link to="/" className="uk-navbar-item uk-logo">
            <span style={{ color: 'white' }}>rTfront</span>
          </Link>
        </div>
        <div className="uk-navbar-right">
          {/** Changes navbar options when user is authenticated */}
          {authenticated ? (
            <ul className="uk-navbar-nav">
              <li>
                <Link to="/">
                  <span style={{ color: 'white' }}>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/settings">
                  <span style={{ color: 'white' }}>Settings</span>
                </Link>
              </li>
              <li>
                <a href="#logout" onClick={handleLogout}>
                  <span style={{ color: 'white' }}>Logout</span>
                </a>
              </li>
            </ul>
          ) : (
            <ul className="uk-navbar-nav">
              <li>
                <Link to="/register">
                  <span style={{ color: 'white' }}>Register</span>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <span style={{ color: 'white' }}>Login</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <div className="pages">
        <ActiveProvider>
          <Routes />
        </ActiveProvider>
      </div>
    </div>
  );
}

export default App;
