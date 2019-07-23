import React from 'react';

import ridesData from '../../helpers/data/ridesData';
import './EditRide.scss';

const defaultRide = {
  driverId: '',
  isLyftUber: '',
  origin: '',
  destination: '',
  departureTime: '',
  openSeats: '',
};

class EditRide extends React.Component {
  state = {
    newRide: defaultRide,
  }

  componentDidMount() {
    const rideId = this.props.match.params.id;
    ridesData.getSingleRide(rideId)
      .then(ridePromise => this.setState({ newRide: ridePromise.data }))
      .catch(error => console.error('could not find single ride', error));
  }

  formFieldStringState = (name, e) => {
    const tempRide = { ...this.state.newRide };
    tempRide[name] = e.target.value;
    this.setState({ newRide: tempRide });
  }

  isLyftUberChange = e => this.formFieldStringState('isLyftUber', e);

  originChange = e => this.formFieldStringState('origin', e);

  destinationChange = e => this.formFieldStringState('destination', e);

  departureTimeChange = e => this.formFieldStringState('departureTime', e);

  openSeatsChange = e => this.formFieldStringState('openSeats', e);

  formSubmit = (e) => {
    e.preventDefault();
    // const saveMe = { ...this.state.newRide };
    // const rideId = this.props.match.params.id;
    // ridesData.putScat(saveMe, rideId)
    //   .then(() => this.props.history.push('/home'))
    //   .catch(error => console.error('unable to save', error));
  }

  render() {
    const { newRide } = this.state;
    return (
      <div className="NewRide">
        <h2>Edit Scat</h2>
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <label htmlFor="departureTime">Departure Time</label>
            <input
              type="text"
              className="form-control"
              id="departureTime"
              placeholder="Sample 12"
              value={newRide.departureTime}
              onChange={this.departureTimeChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              className="form-control"
              id="destination"
              placeholder="Brown"
              value={newRide.destination}
              onChange={this.destinationChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="origin">Origin</label>
            <input
              type="text"
              className="form-control"
              id="origin"
              placeholder="12g"
              value={newRide.origin}
              onChange={this.originChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="isLyftUber">isLyftUber</label>
            <input
              type="text"
              className="form-control"
              id="isLyftUber"
              placeholder="The Moon"
              value={newRide.isLyftUber}
              onChange={this.isLyftUberChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="openSeats">Open Seats</label>
            <input
              type="text"
              className="form-control"
              id="openSeats"
              placeholder="Moose"
              value={newRide.openSeats}
              onChange={this.openSeatsChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Ride</button>
        </form>
      </div>
    );
  }
}

export default EditRide;
