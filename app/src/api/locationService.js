import Axios from 'axios';
import {GOOGLE_API_KEY} from '../constants';

export const getLocationData = (lat, long) => {
  //SINCE A BILLING ACCOUNT NEEDED TO REVERSE GEOCODE I HAVE MOCKED UP THIS FUNCTIONALITY

  // return Axios.get(
  //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_API_KEY}`,
  // );

  return {address: 'Tanzania ,zimbabwe'};
};
