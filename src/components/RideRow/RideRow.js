import React from 'react';
// import moment from 'moment';
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
  }

  componentDidMount() {
    rideUsersData.getRideUsersByRideId(this.props.ride.id).then((rideUsersByRideId) => {
      this.setState({ numPassengers: rideUsersByRideId.length });
    });
  }

  render() {
    const { ride } = this.props;
    const { numPassengers } = this.state;
    // const editLink = `/edit/${ride.id}`;
    const singleLink = `/rides/${ride.id}`;
    return (
      <tr>
        <td>{ride.id}</td>
        <td><Link key={ride.driverId} to={`/users/${ride.driverId}`}>{ride.driverName}</Link></td>
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
