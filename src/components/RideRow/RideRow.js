import React from 'react';
// import moment from 'moment';
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import rideShape from '../../helpers/props/rideShape';
import rideUsersData from '../../helpers/data/rideUsersData';

import './RideRow.scss';

class RideRow extends React.Component {
  static propTypes = {
    rides: PropTypes.arrayOf(rideShape.rideShape),
  }

  state = {
    numPassengers: 0,
    userIsPassenger: false,
  }

  componentDidMount() {
    rideUsersData.getRideUsersByRideId(this.props.ride.id).then((rideUsersByRideId) => {
      const { uid } = firebase.auth().currentUser;
      if (rideUsersByRideId.find(rideUser => rideUser.uid === uid)) {
        this.setState({ userIsPassenger: true });
      }
      this.setState({ numPassengers: rideUsersByRideId.length });
    });
  }

  render() {
    const { ride } = this.props;
    const { numPassengers, userIsPassenger } = this.state;
    // const editLink = `/edit/${ride.id}`;
    const singleLink = `/rides/${ride.id}`;
    return (
      <tr className={`${userIsPassenger ? 'passenger' : ''}`}>
        <td><Link className="driverName" key={ride.driverId} to={`/users/${ride.driverId}`}>{ride.driverName}</Link></td>
        <td>{ride.isLyftUber ? 'Yes' : 'No'}</td>
        <td>{ride.origin}</td>
        <td>{ride.destination}</td>
        <td>{ride.departureTime}</td>
        <td>{ride.totalSeats - numPassengers}</td>
        <td><Link className="btn btn-success" to={singleLink}>View</Link></td>
      </tr>
    );
  }
}

export default RideRow;
