// Imports: Dependencies
import {combineReducers} from 'redux';
// Imports: Reducers
import authReducer from './authReducer';
import applicationReducer from './applicationReducer';
import persistReducer from './persistReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  applicationReducer: applicationReducer,
  persistReducer: persistReducer,
});
// Exports
export default rootReducer;
