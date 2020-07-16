import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { takeEvery, put } from 'redux-saga/effects';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';

function* getPets(){
  const petInfo = yield axios.get(`/pets`);
  yield put({type: 'SET_PETS', payload: petInfo.data});
}

function* getOwners(){
  const ownerInfo = yield axios.get(`/owners`);
  yield put({type: 'SET_OWNERS', payload: ownerInfo});
}

const petsPeducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PETS':
      return action.payload;
      default:
        return state;
  }
}

const ownerReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_OWNERS':
      return action.payload;
      default:
        return state;
  }
}

const sagaMiddleware = createSagaMiddleware();

const storeInstance = createStore (
  combineReducers({
    petsPeducer,
    ownerReducer
  }),
  applyMiddleware(sagaMiddleware, logger)
);


sagaMiddleware.run(rootSaga);


function* rootSaga(){
  yield takeEvery('GET_PETS', getPets);
  yield takeEvery('GET_OWNERS', getOwners);
}


ReactDOM.render(<Provider 
  store={storeInstance}
  ><App /></Provider>, 
  document.getElementById('root'));