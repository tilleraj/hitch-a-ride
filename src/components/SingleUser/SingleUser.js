import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import rideUsersData from '../../helpers/data/rideUsersData';
import usersData from '../../helpers/data/usersData';
import userShape from '../../helpers/props/userShape';

import './SingleUser.scss';

class SingleUser extends React.Component {
  static propTypes = {
    rides: PropTypes.arrayOf(userShape.userShape),
  }

  state = {
    user: {},
    userId: '',
    visitorIsOwner: '',
  };

  componentDidMount() {
    const userId = this.props.match.params.id;
    const { uid } = firebase.auth().currentUser;
    usersData.getSingleUser(userId)
      .then((userPromise) => {
        if (Object.entries(userPromise.data).length === 0) {
          this.props.history.push('/signup');
        } else {
          this.setState({
            userId: Object.keys(userPromise.data)[0],
            user: Object.values(userPromise.data)[0],
          });
          if (uid === Object.values(userPromise.data)[0].uid) {
            this.setState({ visitorIsOwner: true });
          } else {
            this.setState({ visitorIsOwner: false });
          }
          rideUsersData.getRideUsersByUid(userId)
            .then((rideUsers) => {
              const newUser = this.state.user;
              newUser.rideUsers = rideUsers;
              this.setState({ user: newUser });
            })
            .catch(error => console.error('could not get rideUsers', error));
        }
      })
      .catch(error => console.error('unable to get single user', error));
  }

  render() {
    const { user } = this.state;
    // const { visitorIsOwner } = this.state;
    // const editLink = '/home';
    // const editButton = <Link className="btn btn-warning mr-4" to={editLink}>Edit User</Link>;
    return (
      <div className="SingleUser col-12 col-sm-10 offset-sm-1 col-lg-8 offset-lg-2">
        <div className="card">
          <h2>{user.name}</h2>
          <table className="table">
            <tbody>
              <tr>
                <th scope='row'><strong>phone</strong></th>
                <td>{user.phone}</td>
              </tr>
              <tr>
                <th scope='row'><strong>Rides</strong></th>
                <td>{
                  user
                  && user.rideUsers
                  && user.rideUsers.length > 0
                  && user.rideUsers.map(rideUser => (
                    <Link key={rideUser.id} to={`/rides/${rideUser.rideId}`}> - {rideUser.rideId}</Link>
                  ))
                }</td>
              </tr>
            </tbody>
          </table>
          {/* {
          (visitorIsOwner !== '' && visitorIsOwner === true)
            ? <div className='col'>{editButton}</div>
            : ''
        } */}
        </div>
      </div>
    );
  }
}

export default SingleUser;
