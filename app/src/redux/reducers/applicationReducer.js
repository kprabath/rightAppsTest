import {
  ADD_LOCATION,
  DELETE_LOCATION,
  SET_LOCATIONS,
  SET_SELECTED_LOCATION,
} from '../action-types/actionTypes';

const initialState = {
  locations: [],
  selectedLocation: null,
  isLocationLoading: true,
};
// Reducers (Modifies The State And Returns A New State)
const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATIONS: {
      return {
        ...state,
        locations: action.payload,
      };
    }
    case 'SET_IS_LOCATION_LOADING':
      return {
        ...state,
        isLocationLoading: action.payload,
      };
    case ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations, action.payload],
      };
    case DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(el => el._id !== action.payload._id),
      };
    case SET_SELECTED_LOCATION:
      return {
        ...state,
        isLocationLoading: false,
        selectedLocation: action.payload,
      };
    default: {
      return state;
    }
  }
};
// Exports
export default applicationReducer;
