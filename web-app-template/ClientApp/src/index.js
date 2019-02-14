import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import storeConfig from './store/config';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = storeConfig();

const app = (
  <Provider store={store}>
    <BrowserRouter basename='' >
      <App />
    </BrowserRouter>
  </Provider>
);

const rootElement = document.getElementById('root');

ReactDOM.render(app, rootElement);

registerServiceWorker();
