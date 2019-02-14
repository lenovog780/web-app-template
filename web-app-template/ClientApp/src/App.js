import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import AuthorizationTest from './containers/AuthorizationTest/AuthorizationTest';

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncLogout = asyncComponent(() => {
  return import('./containers/Auth/Logout/Logout');
});


class App extends Component {

  componentDidMount() {
    this.props.onAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/logout" component={asyncLogout} />
          <Route path="/fetch-data" component={AuthorizationTest} />
          <Route path="/" exact />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actions.autoLogin())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
