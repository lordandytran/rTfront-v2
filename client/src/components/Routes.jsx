import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SecureRoute from './SecureRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import Settings from '../pages/Settings';
import Stats from '../pages/Stats';

/**
 * Routes component handles every route
 * @returns {React.Component} Routes component
 */
function Routes() {
    return (
        <div className="page-routes">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <SecureRoute exact path="/" component={Home} />
                <SecureRoute exact path="/stats/:id" component={Stats} />
                <SecureRoute exact path="/settings" component={Settings} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default Routes;