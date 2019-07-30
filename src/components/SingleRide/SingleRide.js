import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import ridesData from '../../helpers/data/ridesData';
import rideUsersData from '../../helpers/data/rideUsersData';

import './SingleRide.scss';
import usersData from '../../helpers/data/usersData';

class SingleRide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      ride: { rideUsers: [] },
      visitorIsOwner: '',
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  componentDidMount() {
    const rideId = this.props.match.params.id;
    ridesData.getSingleRide(rideId)
      .then((ridePromise) => {
        this.setState({ ride: ridePromise.data });
        if (firebase.auth().currentUser.uid === ridePromise.data.driverId) {
          this.setState({ visitorIsOwner: true });
        } else {
          this.setState({ visitorIsOwner: false });
        }
        rideUsersData.getRideUsersByRideId(rideId).then((rideUsersByRideId) => {
          const rideWithRiders = this.state.ride;
          rideWithRiders.rideUsers = rideUsersByRideId;
          this.setState({ ride: rideWithRiders });
          usersData.getUserDataForRide(this.state.ride)
            .then((rideUsersWithData) => {
              const newRide = this.state.ride;
              newRide.rideUsers = rideUsersWithData;
              newRide.openSeats -= newRide.rideUsers.length;
              this.setState({ ride: newRide });
            });
        });
      })
      .catch(error => console.error('unable to get single ride', error));
  }

  deleteRide = () => {
    const rideId = this.props.match.params.id;
    if (firebase.auth().currentUser.uid === this.state.ride.driverId) {
      ridesData.deleteRide(rideId)
        .then(() => this.props.history.push('/home'))
        .catch(error => console.error('unable to delete', error));
    }
  }

  joinRide = () => {
    const { uid } = firebase.auth().currentUser;
    const { rideUsers } = this.state.ride;
    const matchingUsers = rideUsers.filter(rideUser => rideUser.uid === uid);
    const rideId = this.props.match.params.id;
    const newRideUser = {
      uid,
      rideId,
      isRequested: true,
      isAccepted: false,
    };
    if (matchingUsers.length < 1) {
      rideUsersData.postRideUser(newRideUser)
        .then(() => this.props.history.push('/home'))
        .catch(error => console.error('unable to delete', error));
    }
  }

  render() {
    const { ride } = this.state;
    const { visitorIsOwner } = this.state;
    const editLink = `/edit/${this.props.match.params.id}`;
    const editButton = <Link className="btn btn-warning mr-4" to={editLink}>Edit Ride</Link>;
    const deleteButton = <Button color="danger" outline onClick={this.toggle}>Delete</Button>;
    const joinButton = <Button color="success" onClick={this.joinRide}>Join Ride</Button>;
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
              <td>{
                ride.driverId
                && ride.rideUsers
                && ride.rideUsers.length > 0
                && ride.rideUsers.find(rideUser => rideUser.uid === ride.driverId)
                && ride.rideUsers.find(rideUser => rideUser.uid === ride.driverId).name}</td>
            </tr>
            <tr>
              <th scope='row'><strong>Riders</strong></th>
              <td>{
                ride
                && ride.rideUsers
                && ride.rideUsers.length > 0
                && ride.rideUsers.map(rideUser => (
                  <Link key={rideUser.id} to={`/users/${rideUser.uid}`}> - {rideUser.name}</Link>
                ))
              }</td>
            </tr>
          </tbody>
        </table>
        {visitorIsOwner !== '' && visitorIsOwner === true && <div className='col'>{editButton}{deleteButton}</div>}
        {visitorIsOwner !== '' && visitorIsOwner === false && this.state.ride.openSeats > 0 && <div className='col'>{joinButton}</div>}
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Delete this Ride</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this ride?</p>
              <p>This cannot be undone.</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" outline onClick={this.deleteRide} className="mr-4">Yes, I'm sure.</Button>
              <Button color="secondary" onClick={this.toggle}>Woops, take me back!</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default SingleRide;
