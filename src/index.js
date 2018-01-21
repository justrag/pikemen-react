import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import io from 'socket.io-client';
import uuidV4 from 'uuid/v4';
import Inc from './components/Inc';
import reducer from './reducers';
import { getIdentity } from './selectors';
import { initializeIdentity, joinGame } from './actions';
import remoteActionMiddleware from './middlewares';

const persistConfig = {
  key: 'root',
  storage: storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

const socket = io(
  `${window.location.protocol}//${window.location.hostname}:8090`
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(remoteActionMiddleware(socket)))
);

const persistor = persistStore(store);

if (!getIdentity(store.getState())) {
  store.dispatch(initializeIdentity(uuidV4()));
}

socket.on('connect', () => {
  store.dispatch(joinGame());
});

socket.on('state', state => {
  //store.dispatch({type: 'SET_STATE', state})
  store.dispatch({ type: 'ALAMAKOTA', payload: state });
  console.log('State: ', state);
});
const App = () => (
  <Provider store={store}>
    <PersistGate loading="Reinitializing" persistor={persistor}>
      <Inc />
    </PersistGate>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
