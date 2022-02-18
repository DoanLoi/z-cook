import React, { useState, useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Col, Spin, Row } from 'antd';
import TekoID from 'teko-oauth2';
import ReactTracker from 'react-tracker-teko';
import { commonConstants } from 'constants/index';
import { browserHistory } from 'helpers';
import './App.less';
import './App.scss';
import Page403 from 'containers/shared/Page403';
import Page404 from 'containers/shared/Page404';
import Page500 from 'containers/shared/Page500';
import PrivateRoute from 'components/shared/PrivateRoute';
import AppLayout from 'containers/AppLayout';

const { tracker } = window.config;

const reactTracker = new ReactTracker({
  // Configure your tracker server and site by providing
  host: (tracker.appId && tracker.host) || '',
  urlServeJsFile: (tracker.appId && tracker.jsFile) || '',
  appId: tracker.appId || '',
});

const App: React.FC = () => {
  return (
    <Row align="middle" justify="center">
      <Col style={{ fontSize: 18, position: 'relative' }} xs={24} md={8} lg={6}>
        <Router history={reactTracker.connectToHistory(browserHistory)}>
          <Switch>
            <Route exact path="/403" component={Page403} />
            <Route exact path="/404" component={Page404} />
            <Route exact path="/500" component={Page500} />
            <PrivateRoute path="/" component={AppLayout} />
          </Switch>
        </Router>
      </Col>
    </Row>
  );
};

export default App;
