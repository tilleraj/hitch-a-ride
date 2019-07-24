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
      <div className="Auth">
        <h1>Auth</h1>
        <Button color="secondary" onClick={this.loginClickEvent}>Login with Google</Button>
      </div>
    );
  }
}

export default Auth;
