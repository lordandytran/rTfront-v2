import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import register from '../libs/auth/register';

/**
 * Registration page form.
 * @returns {React.Component} Register component
 */
function Register() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  function submitForm(event) {
    event.preventDefault();
    register(username, password, code)
    .catch((error) => console.log(error))
    // goes to login when form is submitted
    .then(() => history.push('/login'));
  }

  return (
    <div className="uk-width-1-1 uk-margin-large-top">
      <div className="uk-container">
        <div className="uk-grid uk-grid-stack" uk-grid="true">
          <div className="uk-width-1-1@m">
            <div className="uk-margin 
              uk-width-large 
              uk-margin-auto 
              uk-card 
              uk-card-default 
              uk-card-body 
              uk-box-shadow-large">
              <div 
                className="uk-card-title uk-text-center">rTfront Registration
              </div>
              <form className="uk-margin-medium-top" onSubmit={submitForm}>
                <div className="uk-margin">
                  <div className="uk-inline uk-width-1-1">
                    <span className="uk-form-icon" uk-icon="icon: user"></span>
                    <input required
                      className="uk-input"
                      type="text"
                      placeholder="Choose Username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="uk-margin">
                  <div className="uk-inline uk-width-1-1">
                    <span className="uk-form-icon" uk-icon="icon: lock"></span>
                    <input required
                      className="uk-input"
                      type="password"
                      placeholder="Set Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="uk-margin">
                  <div className="uk-inline uk-width-1-1">
                    <span className="uk-form-icon" uk-icon="icon: search"></span>
                    <input
                      className="uk-input"
                      type="password"
                      placeholder="Registration Code"
                      value={code}
                      onChange={e => setCode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="uk-margin">
                  <button 
                    className="uk-button uk-button-primary uk-width-1-1" 
                    type="submit">Register
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

export default Register;