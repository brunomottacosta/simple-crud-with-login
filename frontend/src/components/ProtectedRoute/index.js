import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { isAuthorized } from '../../helpers/utils';
import Constants from '../../Constants';

const isAuthenticated = () => {
  return !!sessionStorage.getItem(Constants.JwtToken);
};

const ProtectedRoute = props => {
  const { component: Component, roles } = props;

  const userRoles = JSON.parse(sessionStorage.getItem(Constants.UserRoles));

  if (!isAuthenticated()) {
    return <Redirect to="/login"/>;
  }

  if (!!roles && (!userRoles || !isAuthorized(userRoles, roles))) {
    return <Redirect to="/"/>;
  }

  return <Route {...props} component={Component}/>;
};

ProtectedRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  path: PropTypes.string,
  roles: PropTypes.array
};

export default ProtectedRoute;
