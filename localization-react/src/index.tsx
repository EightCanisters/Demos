// eslint-disable-next-line
/// <reference path="./react-app-env.d.ts" />

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LocalizationProvider } from './locales/localeContext/localeProvider';
import { Localization } from './locales/localization/index';


const localization = new Localization();
localization.initializeAsync().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <LocalizationProvider locale={localization}>
        <App />
      </LocalizationProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
});
