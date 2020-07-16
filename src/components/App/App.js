import React, { Component } from 'react';
import './App.css';
import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';
import ManageOwners from '../ManageOwners/ManageOwners';
import { HashRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>

          <Route exact path='/' component={Home}/>
          <Route exact path='/Dashboard' component={Dashboard}/>
          <Route exact path='/ManageOwners' component={ManageOwners}/>

        </Router>
      </div>
    );
  }
}

// const mapStateToProps = (reduxStore) => ({ reduxStore });
export default connect(
  // mapStateToProps
  )(App);