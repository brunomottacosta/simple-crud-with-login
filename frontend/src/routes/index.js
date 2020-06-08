import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import PublicRoute from '../components/PublicRoute';
import ProtectedRoute from '../components/ProtectedRoute';

import Login from '../pages/Login';
import ClientList from '../pages/ClientList';
import ClientForm from '../pages/ClientForm';

const Routes = () => (
  <Switch>
    <Redirect exact from="/" to="/clients" />

    <PublicRoute path="/login" exact component={Login} />
    <ProtectedRoute path="/clients" exact component={ClientList} roles={['ADMIN', 'COMMON']} />
    <ProtectedRoute path="/clients/add" exact component={ClientForm} roles={['ADMIN']} />
    <ProtectedRoute path="/clients/edit/:id" exact component={ClientForm} roles={['ADMIN']} />
  </Switch>
);

export default Routes;
