import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';

import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';
import EditRide from '../components/EditRide/EditRide';
import NewRide from '../components/NewRide/NewRide';
import SingleRide from '../components/SingleRide/SingleRide';
import SingleUser from '../components/SingleUser/SingleUser';
import NavBar from '../components/NavBar/NavBar';
import fbConnection from '../helpers/data/connection';

import './App.scss';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />)
  );
  return <Route {...rest} render={props => routChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />)
  );
  return <Route {...rest} render={props => routChecker(props)} />;
};

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

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <NavBar authed={authed} />
            <div className="container">
              <div className="row">
                <Switch>
                  <PublicRoute path="/auth" component={Auth} authed={authed} />
                  <PrivateRoute path="/home" component={Home} authed={authed} />
                  <PrivateRoute path="/new" component={NewRide} authed={authed} />
                  <PrivateRoute path="/edit/:id" component={EditRide} authed={authed} />
                  <PrivateRoute path="/rides/:id" component={SingleRide} authed={authed} />
                  <PrivateRoute path="/users/:id" component={SingleUser} authed={authed} />
                  <Redirect from="*" to="/auth" />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
