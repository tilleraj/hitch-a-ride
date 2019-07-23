import React from 'react';
import { Link } from 'react-router-dom';

import ridesData from '../../helpers/data/ridesData';

import './SingleRide.scss';

class SingleRide extends React.Component {
  state = {
    ride: {},
  }

  componentDidMount() {
    const rideId = this.props.match.params.id;
    ridesData.getSingleRide(rideId)
      .then(ridePromise => this.setState({ ride: ridePromise.data }))
      .catch(error => console.error('unable to get single ride', error));
  }

  // deleteScat = () => {
  //   const rideId = this.props.match.params.id;
  //   ridesData.deleteScat(rideId)
  //     .then(() => this.props.history.push('/home'))
  //     .catch(error => console.error('unable to delete', error));
  // }

  render() {
    const { ride } = this.state;
    const editLink = `/edit/${this.props.match.params.id}`;
    return (
      <div className="SingleRide">
        <h2>{ride.driverId}</h2>
        <h3>{ride.isLyftUber}</h3>
        <h4>{ride.origin}</h4>
        <h4>{ride.destination}</h4>
        <h4>{ride.departureTime}</h4>
        <h4>{ride.openSeats}</h4>
        <Link className="btn btn-primary" to={editLink}>Edit</Link>
        {/* <button className="btn btn-outline-danger" onClick={this.deleteScat}>Delete</button> */}
      </div>
    );
  }
}

export default SingleRide;
