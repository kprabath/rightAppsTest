import {Axios} from './axiosClient';

export const getLocations = () => Axios.get('locations').then(res => res.data);

export const getWeather = () => Axios('weather').then(res => res.data);

export const addLocation = data =>
  Axios.post('locations', data).then(res => res.data);

export const deleteLocation = deleteId => Axios.delete(`locations/${deleteId}`);



