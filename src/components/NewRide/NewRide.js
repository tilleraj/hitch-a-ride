import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import ridesData from '../../helpers/data/ridesData';
import './NewRide.scss';

const defaultRide = {
  driverId: '',
  isLyftUber: true,
  origin: '',
  destination: '',
  departureTime: '',
  openSeats: '',
};

class NewRide extends React.Component {
  state = {
    newRide: defaultRide,
  }

  formFieldStringState = (name, e) => {
    console.error('e.target.value', e.target.value);
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
    const saveMe = { ...this.state.newRide };
    saveMe.driverId = firebase.auth().currentUser.uid;
    ridesData.postRide(saveMe)
      .then(() => this.props.history.push('/home'))
      .catch(error => console.error('unable to save', error));
  }

  render() {
    const { newRide } = this.state;
    return (
      <div className="NewRide">
        <h2>New Ride</h2>
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <label htmlFor="origin">Origin</label>
            <input
              type="text"
              className="form-control"
              id="origin"
              placeholder="Venue, Double Tree, etc."
              value={newRide.origin}
              onChange={this.originChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              className="form-control"
              id="destination"
              placeholder="Double Tree, Venue, etc."
              value={newRide.destination}
              onChange={this.destinationChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="departureTime">Departure Time</label>
            <input
              type="text"
              className="form-control"
              id="departureTime"
              placeholder="5:00pm"
              value={newRide.departureTime}
              onChange={this.departureTimeChange}
            />
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="isLyftUber"
              // value={newRide.isLyftUber}
              // checked={!!newRide.isLyftUber}
              onChange={this.isLyftUberChange} />
            <label className="form-check-label" htmlFor="isLyftUber">Is a Lyft/Uber</label>
          </div>
          <div className="form-group">
            <label htmlFor="openSeats">Open Seats</label>
            <input
              type="text"
              className="form-control"
              id="openSeats"
              placeholder="4"
              value={newRide.openSeats}
              onChange={this.openSeatsChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Create Ride</button>
        </form>
      </div>
    );
  }
}

export default NewRide;
