import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import firebase from 'firebase/app';
import 'firebase/auth';

import usersData from '../../helpers/data/usersData';
import './NewUser.scss';

const defaultUser = {
  uid: '',
  name: '',
  phone: '',
};

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      rides: [],
      isNewUser: false,
      newUser: defaultUser,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  formFieldStringState = (name, e) => {
    const tempUser = { ...this.state.newUser };
    tempUser[name] = e.target.value;
    this.setState({ newUser: tempUser });
  }

  nameChange = e => this.formFieldStringState('name', e);

  phoneChange = e => this.formFieldStringState('phone', e);

  formSubmit = (e) => {
    e.preventDefault();
    const saveMe = { ...this.state.newUser };
    saveMe.driverId = firebase.auth().currentUser.uid;
    usersData.postUser(saveMe)
      .then(() => this.props.history.push('/home'))
      .catch(error => console.error('unable to save', error));
  }

  componentDidMount() {
    const { uid } = firebase.auth().currentUser;
    usersData.getSingleUser(uid)
      .then((resp) => {
        // if user doesn't exist in database then prompts newuser modal
        if (Object.entries(resp.data).length === 0 && resp.data.constructor === Object) {
          this.toggle();
        }
      }).catch(err => console.error('new user error', err));
  }

  render() {
    const { newUser } = this.state;
    return (
      <div className="NewUser">
        <h2>New User</h2>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create a Profile</ModalHeader>
          <ModalBody>
            <p>Hello and welcome to Hitch a Ride!</p>
            <p>Please enter the information below to get started.</p>
            <Form onSubmit={this.formSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  id="name"
                  placeholder="First Last"
                  value={newUser.name}
                  onChange={this.nameChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="ex: Double Tree, Venue, etc."
                  value={newUser.phone}
                  onChange={this.phoneChange}
                />
              </FormGroup>
              <Button type="submit" color="primary">Create User</Button>
            </Form>
          </ModalBody>
          {/* <ModalFooter>
            <Button color="danger" outline onClick={this.deleteRide} className="mr-4">Yes, I'm sure.</Button>
            <Button color="secondary" onClick={this.toggle}>Woops, take me back!</Button>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

export default NewUser;
