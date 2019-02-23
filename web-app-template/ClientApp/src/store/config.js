import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

import authReducer from './reducers/auth';
import registerReducer from './reducers/register';
import serverDataReducer from './reducers/serverData';
import pingReducer from './reducers/ping';

const configureStore = () => {
  const reducers = {
    auth: authReducer,
    register: registerReducer,
    serverData: serverDataReducer,
    ping: pingReducer
  };

  const middleware = [
    thunk
  ];

  let composeEnhancers = compose;
  if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  );

  return store;
}

export default configureStore;
