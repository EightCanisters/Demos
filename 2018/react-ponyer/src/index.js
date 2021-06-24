import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { LoginAuth } from './components';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

import store from './store';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Fragment>
        <LoginAuth />
        {/* <Route path="/login" component={Login} /> */}
        <Route path="/" component={App} />
      </Fragment>
    </Provider>
  </BrowserRouter>, 
  document.getElementById('root')
);
