import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { Provider } from 'react-redux';
// import Axios from 'axios';


ReactDOM.render(<Provider 
  // store={storeInstance}
  ><App /></Provider>, 
  document.getElementById('root'));