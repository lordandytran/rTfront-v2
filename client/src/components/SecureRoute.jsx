import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from './UserContext';

/**
 * SecureRoute redirects unauthenticated users to the login page.
 * @param {React.Component} props Props component requiring authentication
 * @returns {React.Component} SecureRoute component
 */
function SecureRoute(props) {
    const [authenticated] = useContext(UserContext);
    const Component = props.component;
    return (
        authenticated ? (<Component />) : <Redirect to="/login" />
    )
}

export default SecureRoute;