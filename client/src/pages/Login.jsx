import React, { useContext, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import login from '../libs/auth/login';
import refresh from '../libs/auth/refresh';
import useLogin from '../libs/hooks/useLogin';
import useLoginError from '../libs/hooks/useLoginError';
import { UserContext } from '../components/UserContext';

/**
 * User Login page.
 * @returns {React.Component} Login component
 */
function Login() {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [userLogin, setUserLogin] = useLogin();
  const [loginError, setLoginError] = useLoginError();

  useEffect(() => {
    if (authenticated) {
      history.push('/');
    }
  }, [authenticated, history]);

  // handles refresh token authentication
  useMemo(() => {
    if (localStorage.getItem('rtfront_refresh')) {
      refresh()
      .then(() => {
        // shares the session with other tabs
        localStorage.setItem(
          'RT_NEW_SHARE', 
          sessionStorage.getItem('rtfront_session')
        );
        localStorage.removeItem('RT_NEW_SHARE');
        setAuthenticated(true);
      })
      .catch(() => {
        //do nothing
      });
    }
  }, [setAuthenticated]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoginError('');
    await login(userLogin.username, userLogin.password, userLogin.checked)
    .then(() => {
      // shares the session with other tabs
      localStorage.setItem(
        'RT_NEW_SHARE', 
        sessionStorage.getItem('rtfront_session')
      );
      localStorage.removeItem('RT_NEW_SHARE');
      setAuthenticated(true);
    })
    .catch((e) => {
      if (e.error === 500) {
        setLoginError('Server Error. Try again later.');
      }
      else {
        setLoginError();
      }
    });
  }

  return (
    <div className="uk-width-1-1 uk-margin-large-top">
      <div className="uk-container">
        <div className="uk-grid uk-grid-stack" uk-grid="true">
          <div className="uk-width-1-1@m">
            <div 
              className="uk-margin 
                uk-width-large 
                uk-margin-auto 
                uk-card 
                uk-card-default 
                uk-card-body 
                uk-box-shadow-large">
              <div className="uk-card-title uk-text-center">rTfront</div>
              <div 
                className="uk-text-center 
                  uk-text-danger 
                  uk-margin-small-bottom 
                  uk-margin-small-top">{loginError}&nbsp;
                </div>
              <form onSubmit={handleSubmit}>
                <div className="uk-margin">
                  <div className="uk-inline uk-width-1-1">
                    <span className="uk-form-icon" uk-icon="icon: user"></span>
                    <input required
                      className="uk-input"
                      type="text"
                      placeholder="Username"
                      value={userLogin.email}
                      onChange={(e) => {
                        setUserLogin('username', e.target.value);
                        setLoginError('');
                      }}
                    />
                  </div>
                </div>
                <div className="uk-margin">
                  <div className="uk-inline uk-width-1-1">
                    <span className="uk-form-icon" uk-icon="icon: lock"></span>
                    <input required
                      className="uk-input"
                      type="password"
                      placeholder="Password"
                      value={userLogin.password}
                      onChange={(e) => {
                        setUserLogin('password', e.target.value);
                        setLoginError('');
                      }}
                    />
                  </div>
                </div>
                <div className="uk-margin">
                  <label>
                    <input
                      className="uk-checkbox"
                      type="checkbox"
                      value={userLogin.checked}
                      onChange={(e) => {
                        setUserLogin('checked', e.currentTarget.checked);
                      }}
                    />&nbsp;&nbsp;Keep me logged in
                    </label>
                </div>
                <div className="uk-margin">
                  <button 
                    className="uk-button uk-button-primary uk-width-1-1" 
                    type="submit">Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;