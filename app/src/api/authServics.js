import axios from 'axios';

export const loginToTheSystem = data => {
  return axios
    .post('http://test.rightapps.com.au/auth/login', data)
    .then(res => res.data)
    .then(data => data)
    .catch(er => console.debug(er));
};
