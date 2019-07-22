import React from 'react';
// import moment from 'moment';
// import PropTypes from 'prop-types';

// import rideShapes from '../../helpers/propz/rideShapes';

class RideRow extends React.Component {
  render() {
    const { ride } = this.props;
    return (
      <tr>
        <td>{ride.id}</td>
        <td>{ride.driverId}</td>
        <td>{ride.isLyftUber}</td>
        <td>{ride.origin}</td>
        <td>{ride.destination}</td>
        <td>{ride.departureTime}</td>
        <td>{ride.openSeats}</td>
      </tr>
    );
  }
}

export default RideRow;
