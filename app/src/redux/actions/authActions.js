import {RESET_TOKEN, SET_TOKEN} from '../action-types/actionTypes';

export const setUserToken = payload => {
  return {
    type: SET_TOKEN,
    payload,
  };
};

export const resetUserToken = payload => {
  return {
    type: RESET_TOKEN,
    payload,
  };
};
