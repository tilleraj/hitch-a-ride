import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getRideUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rideUsers.json`)
    .then((response) => {
      const rideUsers = [];
      if (response.data !== null) {
        Object.keys(response.data).forEach((fbKey) => {
          response.data[fbKey].id = fbKey;
          rideUsers.push(response.data[fbKey]);
        });
      }
      resolve(rideUsers);
    })
    .catch(error => reject(error));
});

const getRideUsersByRideId = rideId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rideUsers.json?orderBy="rideId"&equalTo="${rideId}"`)
    .then((response) => {
      const rideUsers = [];
      if (response.data !== null) {
        Object.keys(response.data).forEach((fbKey) => {
          response.data[fbKey].id = fbKey;
          rideUsers.push(response.data[fbKey]);
        });
      }
      resolve(rideUsers);
    })
    .catch(error => reject(error));
});

const deleteRideUser = rideUserId => axios.delete(`${baseUrl}/rideUsers/${rideUserId}.json`);

const getSingleRideUser = rideUserId => axios.get(`${baseUrl}/rideUsers/${rideUserId}.json`);

const postRideUser = newRideUser => axios.post(`${baseUrl}/rideUsers.json`, newRideUser);

const putRideUser = (updatedRideUser, rideUserId) => axios.put(`${baseUrl}/rideUsers/${rideUserId}.json`, updatedRideUser);

export default {
  getRideUsers,
  getRideUsersByRideId,
  deleteRideUser,
  getSingleRideUser,
  postRideUser,
  putRideUser,
};
