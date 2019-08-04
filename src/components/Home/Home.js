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
    ridesData.getRides()
      .then((rides) => {
        this.setState({ rides });
        Promise.all(rides.map(ride => (usersData.getSingleUser(ride.driverId))))
          .then((usersArray) => {
            const ridesWithUserInfo = this.state.rides.map((ride, r) => {
              const newRide = this.state.rides[r];
              const owner = usersArray[r].data;
              newRide.driverName = owner[Object.keys(owner)].name;
              return newRide;
            });
            this.setState({ rides: ridesWithUserInfo });
          });
      })
      .catch(error => console.error('could not get rides', error));
  }

  render() {
    const {
      rides,
    } = this.state;
    return (
      <div className="Home">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <Rides
                  rides={rides}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
