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

function* addOwner(name){
  console.log('in add owner sage', name.payload);
  try {
    const addOwner = yield axios.post(`/owners/${name.payload}`);
    console.log('display owner', addOwner);
    yield put({type: 'GET_OWNERS', payload: addOwner.data[0]});
  }catch (error){
    console.log('error', error);
  }
}

function* deleteOwner(action){
  try{
    yield axios.delete(`/owners/${action.payload}`);
  }catch (error){
    console.log('error', error);
  }
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
  yield takeEvery('ADD_OWNER', addOwner);
  yield takeEvery('DELETE_OWNER', deleteOwner)
}


ReactDOM.render(<Provider 
  store={storeInstance}
  ><App /></Provider>, 
  document.getElementById('root'));