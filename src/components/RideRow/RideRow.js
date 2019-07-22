import React from 'react';
// import moment from 'moment';
import PropTypes from 'prop-types';

import rideShape from '../../helpers/props/rideShape';

class RideRow extends React.Component {
  static propTypes = {
    rides: PropTypes.arrayOf(rideShape.rideShape),
  }

  render() {
    const { ride } = this.props;
    return (
      <tr>
        <td>{ride.id}</td>
        <td>{ride.driverId}</td>
        <td>{ride.isLyftUber.toString()}</td>
        <td>{ride.origin}</td>
        <td>{ride.destination}</td>
        <td>{ride.departureTime}</td>
        <td>{ride.openSeats}</td>
      </tr>
    );
  }
}

export default RideRow;
