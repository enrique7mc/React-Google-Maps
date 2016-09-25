import axios from 'axios';
import Cache from '../util/Cache';

const MAPS_API_KEY = 'AIzaSyDVsujBY3xLG6MyeAgXnCcbhB6NzbbF458';
const GOOGLE_MAPS_BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

module.exports = {
  getLocationFromAddress(address) {
    let storeFromCache = Cache.get(address);
    if (storeFromCache) {
      console.log('from cache');
      return new Promise((resolve) => {
        resolve(storeFromCache.location);
      });
    }

    console.log('from api');

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
