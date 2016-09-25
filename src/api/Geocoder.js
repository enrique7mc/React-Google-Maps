import axios from 'axios';

const MAPS_API_KEY = 'AIzaSyDVsujBY3xLG6MyeAgXnCcbhB6NzbbF458';
const GOOGLE_MAPS_BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

module.exports = {
  getLocationFromAddress(address) {
    const encodedAddress = encodeURIComponent(address);
    const requestUrl = `${GOOGLE_MAPS_BASE_URL}?address=${encodedAddress}&key=${MAPS_API_KEY}`;

    return axios.get(requestUrl)
      .then((res) => {
        if (res.data && res.data.error_message) {
          throw new Error(res.data.error_message);
        }

        if (!res.data.results) {
          throw new Error('0 results were found');
        }

        return res.data.results[0].geometry.location;
      }, (res) => {
        throw new Error(res.data.message);
      });
  }
};
