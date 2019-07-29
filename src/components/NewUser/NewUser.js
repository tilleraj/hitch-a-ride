import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
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
  state = {
    newUser: defaultUser,
  }

  formFieldStringState = (name, e) => {
    const tempUser = { ...this.state.newUser };
    tempUser[name] = e.target.value;
    this.setState({ newUser: tempUser });
  }

  nameChange = e => this.formFieldStringState('name', e);

  phoneChange = e => this.formFieldStringState('phone', e);

  formSubmit = (e) => {
    const saveMe = { ...this.state.newUser };
    saveMe.uid = firebase.auth().currentUser.uid;
    usersData.postUser(saveMe)
      .then(() => this.props.history.push('/home'))
      .catch(error => console.error('unable to save', error));
  }

  componentDidMount() {
    const { uid } = firebase.auth().currentUser;
    usersData.getSingleUser(uid)
      .then((resp) => {
        if (Object.entries(resp.data).length !== 0 && resp.data.constructor === Object) {
          this.props.history.push('/home');
        }
      }).catch(err => console.error('new user error', err));
  }

  render() {
    const { newUser } = this.state;
    return (
      <div className="NewUser col-12 col-sm-10 offset-sm-1 col-lg-8 offset-lg-2">
        <h1>Create a Profile</h1>
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
      </div >
    );
  }
}

export default NewUser;
