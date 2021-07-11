import {
  ADD_LOCATION,
  DELETE_LOCATION,
  SAVE_SELECTED_LOCATION,
  SET_LOCATIONS,
  SET_SELECTED_LOCATION,
} from '../action-types/actionTypes';

export const setLocations = payload => {
  return {
    type: SET_LOCATIONS,
    payload,
  };
};

export const addUserLocation = payload => {
  return {
    type: ADD_LOCATION,
    payload,
  };
};

export const deleteUserLocation = payload => {
  return {
    type: DELETE_LOCATION,
    payload,
  };
};

export const setSelectedLocation = payload => {
  return {
    type: SET_SELECTED_LOCATION,
    payload,
  };
};

export const saveSelectedLocation = payload => {
  return {
    type: SAVE_SELECTED_LOCATION,
    payload,
  };
};

export const setIsLocationsLoading = payload => {
  return {
    type: 'SET_IS_LOCATION_LOADING',
    payload,
  };
};
