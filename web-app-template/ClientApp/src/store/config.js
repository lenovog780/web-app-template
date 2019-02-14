import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

import authReducer from './reducers/auth';
import serverDataReducer from './reducers/serverData';

const configureStore = () => {
  const reducers = {
    auth: authReducer,
    serverData: serverDataReducer
  };

  const middleware = [
    thunk
  ];

  const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

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
