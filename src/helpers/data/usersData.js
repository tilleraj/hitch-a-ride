import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getAllUsers = uid => new Promise((resolve, reject) => {
  // axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
  axios.get(`${baseUrl}/users.json`)
    .then((response) => {
      const users = [];
      if (response.data !== null) {
        Object.keys(response.data).forEach((fbKey) => {
          response.data[fbKey].id = fbKey;
          users.push(response.data[fbKey]);
        });
      }
      resolve(users);
    })
    .catch(error => reject(error));
});

const getUserDataForRide = ride => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json`)
    .then((response) => {
      const users = [];
      Object.keys(response.data).forEach((fbKey) => {
        response.data[fbKey].id = fbKey;
        users.push(response.data[fbKey]);
      });
      const rideUsersWithData = ride.rideUsers.map((rideUser) => {
        const newRideUser = rideUser;
        const matchingUsers = users.find(user => user.uid === rideUser.uid);
        newRideUser.userId = matchingUsers.id;
        newRideUser.name = matchingUsers.name;
        newRideUser.phone = matchingUsers.phone;
        return newRideUser;
      });
      resolve(rideUsersWithData);
    })
    .catch();
});

const getSingleUser = userId => axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${userId}"`);

const postUser = newUser => axios.post(`${baseUrl}/users.json`, newUser);

const putUser = (updateUser, userId) => axios.put(`${baseUrl}/users/${userId}.json`, updateUser);

export default {
  getAllUsers,
  getSingleUser,
  getUserDataForRide,
  postUser,
  putUser,
};
