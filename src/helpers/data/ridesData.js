import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getRides = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rides.json?orderBy="departureTime"`)
    .then((response) => {
      const rides = [];
      if (response.data !== null) {
        Object.keys(response.data).forEach((fbKey) => {
          response.data[fbKey].id = fbKey;
          rides.push(response.data[fbKey]);
        });
        rides.sort((a, b) => {
          const time1Date = '10/31/2020 '.concat(Object.values(a)[0]);
          const time2Date = '10/31/2020 '.concat(Object.values(b)[0]);
          const parsedTime1Date = Date.parse(time1Date);
          const parsedTime2Date = Date.parse(time2Date);
          if (parsedTime1Date < parsedTime2Date) return -1;
          if (parsedTime1Date > parsedTime2Date) return 1;
          return 0;
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
  deleteRide,
  getSingleRide,
  postRide,
  putRide,
};
