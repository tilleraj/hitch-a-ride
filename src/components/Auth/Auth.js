import React from 'react';
import { Button } from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  render() {
    return (
      <div className="Auth col-12 col-sm-10 offset-sm-1 col-lg-8 offset-lg-2">
        <div className="card">
          <h1>Welcome to Hitch a Ride!</h1>
          <p>Looking to split a Lyft to Hope and Andrew's wedding?</p>
          <p>Driving yourself and have some extra seats?</p>
          <p>You're in the right place!</p>
          <Button color="secondary" onClick={this.loginClickEvent}>Login with Google</Button>
        </div>
      </div>
    );
  }
}

export default Auth;
