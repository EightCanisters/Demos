import React, { Component, Fragment } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

import '../src/libs/less/reset.less';
import './app.less';

import { Tabbar, Navbar } from './components';
import routes from './routes';

const mapStateToProps = (state) => {
  return {
    isSubpage: state.ui.isSubpage
  }
}

@connect(mapStateToProps)
export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <div className="mp-body">
          <Switch>
            {
              routes.map(route => {
                return (
                  <Route 
                    key={route.path}
                    path={route.path}
                    component={route.component}
                  />
                )
              })
            }
            <Redirect to="/home" />
          </Switch>
        </div>
        {
          this.props.isSubpage === false 
          &&
          <div className="mp-tabbar-container">
            <Tabbar routes={routes.filter(route => route.isTabbarItem === true)} />
          </div>
        }
      </Fragment>
    );
  }
}
