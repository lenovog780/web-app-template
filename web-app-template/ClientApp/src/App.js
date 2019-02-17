import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncRegister = asyncComponent(() => {
  return import('./containers/Auth/Register/Register');
});

const asyncLogout = asyncComponent(() => {
  return import('./containers/Auth/Logout/Logout');
});

const asyncAuthorizationTest = asyncComponent(() => {
  return import('./containers/AuthorizationTest/AuthorizationTest');
});


class App extends Component {

  componentDidMount() {
    this.props.onAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/register" component={asyncRegister} />
        <Route path="/" exact />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/logout" component={asyncLogout} />
          <Route path="/fetch-data" component={asyncAuthorizationTest} />
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
