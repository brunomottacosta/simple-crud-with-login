import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const PublicRoute = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  return Layout ? (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  ) : (
    <Route {...props} component={Component} />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  path: PropTypes.string
};

export default PublicRoute;
