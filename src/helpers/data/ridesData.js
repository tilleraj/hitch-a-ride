import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getRides = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rides.json`)
    .then((response) => {
      const rides = [];
      if (response.data !== null) {
        Object.keys(response.data).forEach((fbKey) => {
          response.data[fbKey].id = fbKey;
          rides.push(response.data[fbKey]);
        });
      }
      resolve(rides);
    })
    .catch(error => reject(error));
});

const getRidesByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rides.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const rides = [];
      if (response.data !== null) {
        Object.keys(response.data).forEach((fbKey) => {
          response.data[fbKey].id = fbKey;
          rides.push(response.data[fbKey]);
        });
      }
      resolve(rides);
    })
    .catch(error => reject(error));
});

const deleteRide = rideId => axios.delete(`${baseUrl}/rides/${rideId}.json`);

const getSingleRide = rideId => axios.get(`${baseUrl}/rides/${rideId}.json`);

const postRide = newRide => axios.post(`${baseUrl}/rides.json`, newRide);

const putRide = (updatedRide, rideId) => axios.put(`${baseUrl}/rides/${rideId}.json`, updatedRide);

export default {
  getRides,
  getRidesByUid,
  deleteRide,
  getSingleRide,
  postRide,
  putRide,
};
