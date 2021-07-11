import axios from 'axios';
import {BASE_URL} from '../constants';
import isNull from 'lodash/isNull';

import {store} from '../redux/store';

export const Axios = axios.create({baseURL: BASE_URL});

Axios.interceptors.request.use(
  async config => {
    const token = store.getState().authReducer.token;
    if (!config.headers.Authorization && !isNull(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
