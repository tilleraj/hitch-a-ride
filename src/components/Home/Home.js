import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import Rides from '../Rides/Rides';
import ridesData from '../../helpers/data/ridesData';
import usersData from '../../helpers/data/usersData';

import './Home.scss';

class Home extends React.Component {
  state = {
    rides: [],
  }

  checkProfile = (uid) => {
    usersData.getSingleUser(uid)
      .then((resp) => {
        if (Object.entries(resp.data).length === 0) {
          this.props.history.push('/signup');
        }
      }).catch(error => console.error(error, 'error getting single user'));
  };

  componentDidMount() {
    const { uid } = firebase.auth().currentUser;
    this.checkProfile(uid);
    ridesData.getRides(uid)
      .then(rides => this.setState({ rides }))
      .catch(error => console.error('could not get rides', error));
  }

  render() {
    const {
      rides,
    } = this.state;
    return (
      <div className="Home">
        <h2>Home</h2>
        {/* <button className="btn btn-warning" onClick={this.editEvent}>Edit</button> */}
        {/* <Link to={singleLink}>View Single</Link> */}
        <div className="container">
          <div className="row">
            <Rides
              rides={rides}
              deleteRide={this.deleteRide}
              selectRideToEdit={this.selectRideToEdit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
