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

  // deleteRide = () => {
  //   const rideId = this.props.match.params.id;
  //   ridesData.deleteRide(rideId)
  //     .then(() => this.props.history.push('/home'))
  //     .catch(error => console.error('unable to delete', error));
  // }

  render() {
    const { ride } = this.state;
    const editLink = `/edit/${this.props.match.params.id}`;
    return (
      <div className="SingleRide  col-12 col-sm-10 offset-sm-1 col-lg-8 offset-lg-2">
        <h2>{this.props.match.params.id}</h2>
        <table className="table">
          <tbody>
            <tr>
              <th scope='row'><strong>From</strong></th>
              <td>{ride.origin}</td>
            </tr>
            <tr>
              <th scope='row'><strong>To</strong></th>
              <td>{ride.destination}</td>
            </tr>
            <tr>
              <th scope='row'><strong>Leaving at</strong></th>
              <td>{ride.departureTime}</td>
            </tr>
            <tr>
              <th scope='row'><strong>Lyft/Uber?</strong></th>
              <td>{ride.isLyftUber ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <th scope='row'><strong>Open Seats</strong></th>
              <td>{ride.openSeats}</td>
            </tr>
            <tr>
              <th scope='row'><strong>Organized by</strong></th>
              <td>{ride.driverId}</td>
            </tr>
          </tbody>
        </table>
        <Link className="btn btn-warning" to={editLink}>Edit</Link>
        {/* <button className="btn btn-outline-danger" onClick={this.deleteRide}>Delete</button> */}
      </div>
    );
  }
}

export default SingleRide;
