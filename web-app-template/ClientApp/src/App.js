import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Layout>
          <Switch>
            <Route path="/" />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
