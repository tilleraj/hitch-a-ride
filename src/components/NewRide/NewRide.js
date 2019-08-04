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
import usersData from '../../helpers/data/usersData';
import rideUsersData from '../../helpers/data/rideUsersData';
import './NewRide.scss';

const defaultRide = {
  driverId: '',
  isLyftUber: true,
  origin: '',
  destination: '',
  departureTime: '',
  totalSeats: '2',
};

class NewRide extends React.Component {
  state = {
    newRide: defaultRide,
  }

  formFieldStringState = (name, e) => {
    const tempRide = { ...this.state.newRide };
    if (name === 'totalSeats') {
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

  totalSeatsChange = e => this.formFieldStringState('totalSeats', e);

  joinRide = (rideId, uid) => {
    const newRideUser = {
      uid,
      rideId,
      isRequested: false,
      isAccepted: true,
    };
    rideUsersData.postRideUser(newRideUser)
      .then(() => this.props.history.push('/home'))
      .catch(error => console.error('unable to join newRide', error));
  }

  formSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newRide };
    saveMe.driverId = firebase.auth().currentUser.uid;
    ridesData.postRide(saveMe)
      .then((rideId) => {
        this.joinRide(rideId.data.name, saveMe.driverId);
      })
      .catch(error => console.error('unable to save', error));
  }

  checkProfile = (uid) => {
    usersData.getSingleUser(uid)
      .then((resp) => {
        if (Object.entries(resp.data).length === 0) {
          this.props.history.push('/signup');
        }
      }).catch(error => console.error(error, 'error getting single user'));
  };

  componentDidMount() {
    const { uid } = firebase.auth().currentUser;
    this.checkProfile(uid);
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
            <Label for="totalSeats">Total Seats</Label>
            <Input
              id="totalSeats"
              placeholder="-"
              type="number"
              value={newRide.totalSeats}
              onChange={this.totalSeatsChange}
            />
          </FormGroup>
          <Button type="submit" color="primary" className="mr-4">Create Ride</Button>
          <Button type="button" color="warning" onClick={() => this.props.history.push('/home')}>Cancel Ride</Button>
        </Form>
      </div>
    );
  }
}

export default NewRide;
