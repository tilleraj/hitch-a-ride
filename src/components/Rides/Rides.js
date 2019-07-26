import React from 'react';
import PropTypes from 'prop-types';

import rideShape from '../../helpers/props/rideShape';
import RideRow from '../RideRow/RideRow';

import './Rides.scss';

class Rides extends React.Component {
  static propTypes = {
    rides: PropTypes.arrayOf(rideShape.rideShape),
  }

  render() {
    const rideComponents = this.props.rides.map(ride => (
      <RideRow
        key={ride.id}
        ride={ride}
        deleteRide={this.props.deleteRide}
        selectRideToEdit={this.props.selectRideToEdit}
      />
    ));
    return (
      <div className="Rides col">
        <h2>Rides</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Ride Id</th>
              <th scope="col">Driver / Organizer</th>
              <th scope="col">Lyft/Uber?</th>
              <th scope="col">Origin</th>
              <th scope="col">Destination</th>
              <th scope="col">Departure Time</th>
              <th scope="col">Open Seats</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {rideComponents}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Rides;
