import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

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
    usersData.getSingleUser(userId)
      .then((userPromise) => {
        this.setState({
          userId: Object.keys(userPromise.data)[0],
          user: Object.values(userPromise.data)[0],
        });
        if (firebase.auth().currentUser.uid === Object.values(userPromise.data)[0].uid) {
          this.setState({ visitorIsOwner: true });
        } else {
          this.setState({ visitorIsOwner: false });
        }
      })
      .catch(error => console.error('unable to get single user', error));
  }

  render() {
    const { user } = this.state;
    const { visitorIsOwner } = this.state;
    const editLink = '/home';
    const editButton = <Link className="btn btn-warning mr-4" to={editLink}>Edit User</Link>;
    return (
      <div className="SingleUser  col-12 col-sm-10 offset-sm-1 col-lg-8 offset-lg-2">
        <h2>{this.props.match.params.id}</h2>
        <table className="table">
          <tbody>
            <tr>
              <th scope='row'><strong>uid</strong></th>
              <td>{user.uid}</td>
            </tr>
            <tr>
              <th scope='row'><strong>name</strong></th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th scope='row'><strong>phone</strong></th>
              <td>{user.phone}</td>
            </tr>
          </tbody>
        </table>
        {
          (visitorIsOwner !== '' && visitorIsOwner === true)
            ? <div className='col'>{editButton}</div>
            : ''
        }
      </div>
    );
  }
}

export default SingleUser;
