import {loginToTheSystem} from '../../api/authServics';
import {setUserToken} from '../actions/authActions';

export function login(data) {
  return function (dispatch) {
    loginToTheSystem(data).then(data => {
      dispatch(setUserToken(data.token));
    });
  };
}
