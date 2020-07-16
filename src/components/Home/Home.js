import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';


class Home extends Component {

  render() {
    return (
        <div>
            <h1>Here's the Homepage.</h1>
        </div>
    );
  }
}

// const mapStateToProps = (reduxStore) => ({ reduxStore });
export default connect(
    // mapStateToProps
    )(Home);