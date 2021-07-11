import {RESET_TOKEN, SET_TOKEN} from '../action-types/actionTypes';

const initialState = {
  token: null,
};
// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case RESET_TOKEN:
      return {
        ...state,
        token: null,
      };
    default: {
      return state;
    }
  }
};
// Exports
export default authReducer;
