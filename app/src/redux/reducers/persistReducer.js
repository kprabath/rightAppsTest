import {SAVE_SELECTED_LOCATION} from '../action-types/actionTypes';

const initialState = {
  savedLocation: null,
};
// Reducers (Modifies The State And Returns A New State)
const persistReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_SELECTED_LOCATION: {
      return {
        ...state,
        savedLocation: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
// Exports
export default persistReducer;
