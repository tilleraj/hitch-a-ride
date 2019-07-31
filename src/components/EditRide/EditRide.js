import React from 'react';
import {
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import ridesData from '../../helpers/data/ridesData';
import './EditRide.scss';

const defaultRide = {
  driverId: '',
  isLyftUber: '',
  origin: '',
  destination: '',
  departureTime: '',
  totalSeats: '',
};

class EditRide extends React.Component {
  state = {
    editRide: defaultRide,
  }

  componentDidMount() {
    const rideId = this.props.match.params.id;
    ridesData.getSingleRide(rideId)
      .then(ridePromise => this.setState({ editRide: ridePromise.data }))
      .catch(error => console.error('could not find single ride', error));
  }

  formFieldStringState = (name, e) => {
    const tempRide = { ...this.state.editRide };
    if (name === 'totalSeats') {
      tempRide[name] = Number(e.target.value);
    } else {
      tempRide[name] = e.target.value;
    }
    this.setState({ editRide: tempRide });
  }

  lyftUberChange(isLyftUber) {
    const tempRide = { ...this.state.editRide };
    tempRide.isLyftUber = isLyftUber;
    this.setState({ editRide: tempRide });
  }

  originChange = e => this.formFieldStringState('origin', e);

  destinationChange = e => this.formFieldStringState('destination', e);

  departureTimeChange = e => this.formFieldStringState('departureTime', e);

  totalSeatsChange = e => this.formFieldStringState('totalSeats', e);

  formSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.editRide };
    const rideId = this.props.match.params.id;
    ridesData.putRide(saveMe, rideId)
      .then(() => this.props.history.push(`/rides/${rideId}`))
      .catch(error => console.error('unable to save', error));
  }

  render() {
    const { editRide } = this.state;
    return (
      <div className="EditRide col-12 col-sm-10 offset-sm-1 col-lg-8 offset-lg-2">
        <h2>Edit Ride</h2>
        <Form onSubmit={this.formSubmit}>
          <FormGroup>
            <Label for="origin">Origin</Label>
            <Input
              id="origin"
              placeholder="ex: Venue, Double Tree, etc."
              value={editRide.origin}
              onChange={this.originChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="destination">Destination</Label>
            <Input
              id="destination"
              placeholder="ex: Double Tree, Venue, etc."
              value={editRide.destination}
              onChange={this.destinationChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="departureTime">Departure Time</Label>
            <Input
              id="departureTime"
              placeholder="17:15"
              type="time"
              value={editRide.departureTime}
              onChange={this.departureTimeChange}
            />
          </FormGroup>
          <FormGroup>
            <ButtonGroup id="lyftUberButtonGroup">
              <Button outline color="info" onClick={() => this.lyftUberChange(true)} active={editRide.isLyftUber === true}>Is a Lyft/Uber</Button>
              <Button outline color="info" onClick={() => this.lyftUberChange(false)} active={editRide.isLyftUber === false}>Not a Lyft/Uber</Button>
            </ButtonGroup>
          </FormGroup>
          <FormGroup>
            <Label for="totalSeats">Total Seats</Label>
            <Input
              id="totalSeats"
              placeholder="-"
              type="number"
              value={editRide.totalSeats}
              onChange={this.totalSeatsChange}
            />
          </FormGroup>
          <Button type="submit" color="primary" className="mr-4">Submit Changes</Button>
          <Button type="button" color="warning" onClick={() => this.props.history.push(`/rides/${this.props.match.params.id}`)}>Cancel Changes</Button>
        </Form>
      </div>
    );
  }
}

export default EditRide;
