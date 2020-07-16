import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

// import Axios from 'axios';

function* rootSaga() {
 
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

const storeInstance = createStore(
  combineReducers({
      
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware), //logger
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);


ReactDOM.render(<Provider 
  store={storeInstance}
  ><App /></Provider>, 
  document.getElementById('root'));