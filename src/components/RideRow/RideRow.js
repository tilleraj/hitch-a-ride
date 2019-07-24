import React from 'react';
// import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import rideShape from '../../helpers/props/rideShape';

import './RideRow.scss';

class RideRow extends React.Component {
  static propTypes = {
    rides: PropTypes.arrayOf(rideShape.rideShape),
  }

  render() {
    const { ride } = this.props;
    // const editLink = `/edit/${ride.id}`;
    const singleLink = `/rides/${ride.id}`;
    return (
      <tr>
        <td>{ride.id}</td>
        <td>{ride.driverId}</td>
        <td>{ride.isLyftUber ? 'Yes' : 'No'}</td>
        <td>{ride.origin}</td>
        <td>{ride.destination}</td>
        <td>{ride.departureTime}</td>
        <td>{ride.openSeats}</td>
        <td><Link className="btn btn-success" to={singleLink}>View</Link></td>
      </tr>
    );
  }
}

export default RideRow;
