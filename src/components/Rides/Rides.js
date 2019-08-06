import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
} from 'reactstrap';

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
      />
    ));
    return (
      <div className="Rides">
        <h2>Ride Board</h2>
        <Table striped responsive>
          <thead>
            <tr>
              <th scope="col">Ride Id</th>
              <th scope="col">Organizer</th>
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
        </Table>
      </div>
    );
  }
}

export default Rides;
