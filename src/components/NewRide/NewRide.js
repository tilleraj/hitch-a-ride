import React from 'react';
import {
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
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
    const tempRide = { ...this.state.newRide };
    if (name === 'openSeats') {
      tempRide[name] = Number(e.target.value);
    } else {
      tempRide[name] = e.target.value;
    }
    this.setState({ newRide: tempRide });
  }

  lyftUberChange(isLyftUber) {
    const tempRide = { ...this.state.newRide };
    tempRide.isLyftUber = isLyftUber;
    this.setState({ newRide: tempRide });
  }

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
      <div className="NewRide col-12 col-sm-10 offset-sm-1 col-lg-8 offset-lg-2">
        <h2>New Ride</h2>
        <Form onSubmit={this.formSubmit}>
          <FormGroup>
            <Label for="origin">Origin</Label>
            <Input
              id="origin"
              placeholder="ex: Venue, Double Tree, etc."
              value={newRide.origin}
              onChange={this.originChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="destination">Destination</Label>
            <Input
              id="destination"
              placeholder="ex: Double Tree, Venue, etc."
              value={newRide.destination}
              onChange={this.destinationChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="departureTime">Departure Time</Label>
            <Input
              id="departureTime"
              placeholder="17:15"
              type="time"
              value={newRide.departureTime}
              onChange={this.departureTimeChange}
            />
          </FormGroup>
          <FormGroup>
            <ButtonGroup id="lyftUberButtonGroup">
              <Button outline color="info" onClick={() => this.lyftUberChange(true)} active={newRide.isLyftUber === true}>Is a Lyft/Uber</Button>
              <Button outline color="info" onClick={() => this.lyftUberChange(false)} active={newRide.isLyftUber === false}>Not a Lyft/Uber</Button>
            </ButtonGroup>
          </FormGroup>
          <FormGroup>
            <Label for="openSeats">Open Seats</Label>
            <Input
              id="openSeats"
              placeholder="3"
              type="number"
              value={newRide.openSeats}
              onChange={this.openSeatsChange}
            />
          </FormGroup>
          <Button type="submit" color="primary" className="mr-4">Create Ride</Button>
          <Button type="button" color="warning" onClick={() => this.props.history.push(`/rides/${this.props.match.params.id}`)}>Cancel Ride</Button>
        </Form>
      </div>
    );
  }
}

export default NewRide;
