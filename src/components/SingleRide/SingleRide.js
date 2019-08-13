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
      deleteModal: false,
      updateModal: false,
      ride: { rideUsers: [] },
      visitorIsOwner: '',
      oldRide: {},
      oldRideInfo: '',
      newRideInfo: '',
      matchingRideInfo: '',
    };

    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
  }

  toggleDeleteModal() {
    this.setState({ deleteModal: !this.state.deleteModal });
  }

  toggleUpdateModal() {
    this.setState({ updateModal: !this.state.updateModal });
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
              newRide.totalSeats -= newRide.rideUsers.length;
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
        .then(() => {
          rideUsersData.getRideUsersByRideId(rideId)
            .then((rideUsersArray) => {
              rideUsersArray.forEach((rideUser) => {
                rideUsersData.deleteRideUser(rideUser.id);
              });
            });
          this.props.history.push('/home');
        })
        .catch(error => console.error('unable to delete', error));
    }
  }

  checkExistingRides = () => {
    // store current ride
    // get existing rideUsers by uid
    // check for rideUsers with same origin and destination (v2 make this a fuzzy match)
    // if no rideUsers with identical origin and destination => joinRide
    // else prompt user that they want to change with modal containing info from both rides
    const { uid } = firebase.auth().currentUser;
    const { destination, origin } = this.state.ride;
    rideUsersData.getRideUsersByUid(uid)
      .then((existingRides) => {
        const rideIds = [];
        if (existingRides.length > 0) {
          existingRides.forEach((ride) => {
            rideIds.push(ride.rideId);
          });
          Promise.all(rideIds.map(rideId => (ridesData.getSingleRide(rideId))))
            .then((arrayOfSingleRides) => {
              const singleRidesWithRideIds = arrayOfSingleRides.map((ride, r) => {
                const newRide = {};
                newRide.id = rideIds[r];
                Object.keys(ride.data).forEach((key) => {
                  const value = ride.data[key];
                  newRide[key] = value;
                });
                return newRide;
              });
              const matchingRide = singleRidesWithRideIds.find(
                ride => ride.origin === origin
                  && ride.destination === destination,
              );
              if (matchingRide) {
                const { ride } = this.state;
                const oldRide = matchingRide;
                const newRideInfo = `departing at ${ride.departureTime}`;
                const oldRideInfo = `departing at ${matchingRide.departureTime}`;
                this.setState({ newRideInfo, oldRideInfo, oldRide });
                this.toggleUpdateModal();
              } else {
                this.joinRide();
              }
            })
            .catch(error => console.error('problem with Promise.all in checkExistingRides', error));
        } else {
          this.joinRide();
        }
      })
      .catch(error => console.error('unable to checkExistingRides', error));
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
        .catch(error => console.error('unable to join', error));
    }
  }

  changeRides = () => {
    const { uid } = firebase.auth().currentUser;
    const oldRideId = this.state.oldRide.id;
    rideUsersData.getRideUsersByUid(uid)
      .then((rideUsers) => {
        const matchingRideUser = rideUsers.find(rideUser => rideUser.rideId === oldRideId);
        rideUsersData.deleteRideUser(matchingRideUser.id);
      })
      .then(() => {
        this.joinRide();
      })
      .catch(error => console.error('unable to change rides', error));
  }

  leaveRide = () => {
    const { uid } = firebase.auth().currentUser;
    const { rideUsers } = this.state.ride;
    const matchingRideUser = rideUsers.find(rideUser => rideUser.uid === uid);
    rideUsersData.deleteRideUser(matchingRideUser.id)
      .then(() => this.props.history.push('/home'))
      .catch(error => console.error('unable to delete', error));
  }

  render() {
    const { ride } = this.state;
    const { uid } = firebase.auth().currentUser;
    const { visitorIsOwner } = this.state;
    const editLink = `/edit/${this.props.match.params.id}`;
    const editButton = <Link className="btn btn-warning mr-4" to={editLink}>Edit Ride</Link>;
    const deleteButton = <Button color="danger" outline onClick={this.toggleDeleteModal}>Delete</Button>;
    const joinButton = <Button color="success" onClick={this.checkExistingRides}>Join Ride</Button>;
    const leaveButton = <Button color="warning" onClick={this.leaveRide}>Leave</Button>;
    return (
      <div className="SingleRide col-12 col-sm-10 offset-sm-1 col-lg-8 offset-lg-2">
        <div className="card">
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
                <td>{ride.totalSeats}</td>
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
          {visitorIsOwner !== ''
            && visitorIsOwner === false
            && ride.rideUsers
            && ride.rideUsers.length
            && ride.rideUsers.length > 0
            && ride.rideUsers.find(rideUser => rideUser.uid === uid)
            && <div className='col'>{leaveButton}</div>}
          {visitorIsOwner !== ''
            && visitorIsOwner === false
            && ride.rideUsers
            && ride.rideUsers.length
            && ride.rideUsers.length > 0
            && visitorIsOwner !== ''
            && visitorIsOwner === false
            && ride.totalSeats > 0
            && !ride.rideUsers.find(rideUser => rideUser.uid === uid)
            && <div className='col'>{joinButton}</div>
          }
          <div>
            <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
              <ModalHeader toggle={this.toggleDeleteModal}>Delete this Ride</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this ride?</p>
                <p>This cannot be undone.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" outline onClick={this.deleteRide} className="mr-4">Yes, I'm sure.</Button>
                <Button color="secondary" onClick={this.toggleDeleteModal}>Woops, take me back!</Button>
              </ModalFooter>
            </Modal>
          </div>
          <div>
            <Modal isOpen={this.state.updateModal} toggle={this.toggleUpdateModal}>
              <ModalHeader toggle={this.toggleUpdateModal}>Change Ride</ModalHeader>
              <ModalBody>
                <p>It looks like you're already in a ride
                from <strong>{this.state.ride.origin} </strong>
                  to <strong>{this.state.ride.destination}</strong>.</p>
                <p>Do you want to leave the ride {this.state.oldRideInfo} to join the ride {this.state.newRideInfo}?</p>
                <p>This cannot be undone.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="warning" outline onClick={this.changeRides} className="mr-4">Yes, I'm sure.</Button>
                <Button color="secondary" onClick={this.toggleUpdateModal}>Woops, take me back!</Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleRide;
