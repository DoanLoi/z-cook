import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Spin } from 'antd';
import { userHooks } from 'hooks';
import { userServices } from 'services';
import { IRoute } from 'interfaces';
import { StoreContext } from 'contexts';

const PrivateRoute = ({
  component: Component,
  ...rest
}: Omit<IRoute, 'name'>) => {
  // Show spin when fetching required global data
  if (false) {
    return <Spin className="app-spin" />;
  }

  return (
    <Route {...rest} render={routeProps => <Component {...routeProps} />} />
  );
};

export default PrivateRoute;
