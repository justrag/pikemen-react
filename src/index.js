import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import Inc from './components/Inc'

const dummyReducer = (state=false, action) => state;

const store = createStore(
   dummyReducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );

const socket = io(`${window.location.protocol}//${window.location.hostname}:8090`);
socket.on('state', state => {
  //store.dispatch({type: 'SET_STATE', state})
  store.dispatch({type: 'ALAMAKOTA', payload: state});
  console.log("State: ",state)
}
);
const App = () => <Provider store={store}><Inc /></Provider>

ReactDOM.render(<App />, document.getElementById('root'));
