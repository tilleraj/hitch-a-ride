import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import firebase from 'firebase/app';

import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';
import NavBar from '../components/NavBar/NavBar';
import fbConnection from '../helpers/data/connection';

import './App.scss';

fbConnection();


class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    const loadComponent = () => {
      if (authed) {
        return <Home />;
      }
      return <Auth />;
    };

    return (
      <div className="App">
        <NavBar authed={authed} />
        {loadComponent()}
      </div>
    );
  }
}

export default App;
