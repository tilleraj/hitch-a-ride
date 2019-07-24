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
  openSeats: '',
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
    if (name === 'openSeats') {
      tempRide[name] = Number(e.target.value);
      console.error(e.target.value);
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

  openSeatsChange = e => this.formFieldStringState('openSeats', e);


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
              placeholder="12g"
              value={editRide.origin}
              onChange={this.originChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="destination">Destination</Label>
            <Input
              id="destination"
              placeholder="Brown"
              value={editRide.destination}
              onChange={this.destinationChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="departureTime">Departure Time</Label>
            <Input
              id="departureTime"
              placeholder="Sample 12"
              type="time"
              value={editRide.departureTime}
              onChange={this.departureTimeChange}
            />
          </FormGroup>
          <FormGroup>
            <ButtonGroup id="lyftUberButtonGroup">
              <Button color="primary" onClick={() => this.lyftUberChange(true)} active={editRide.isLyftUber === true}>Is a Lyft/Uber</Button>
              <Button color="primary" onClick={() => this.lyftUberChange(false)} active={editRide.isLyftUber === false}>Is not a Lyft/Uber</Button>
            </ButtonGroup>
          </FormGroup>
          <FormGroup>
            <Label for="openSeats">Open Seats</Label>
            <Input
              id="openSeats"
              placeholder="3"
              type="number"
              value={editRide.openSeats}
              onChange={this.openSeatsChange}
            />
          </FormGroup>
          <Button type="submit" color="primary">Update Ride</Button>
        </Form>
      </div>
    );
  }
}

export default EditRide;
