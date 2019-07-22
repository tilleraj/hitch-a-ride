import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import Rides from '../Rides/Rides';
import ridesData from '../../helpers/data/ridesData';

import './Home.scss';

class Home extends React.Component {
  state = {
    rides: [],
  }

  componentDidMount() {
    ridesData.getRides(firebase.auth().currentUser.uid)
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
