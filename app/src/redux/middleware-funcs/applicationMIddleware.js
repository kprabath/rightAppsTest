import {getLocations, getWeather} from '../../api/applicationService';
import {
  saveSelectedLocation,
  setIsLocationsLoading,
  setLocations,
  setSelectedLocation,
} from '../actions/applicationReducerActions';

export function getAvailableLocations() {
  return function (dispatch) {
    getLocations().then(data => {
      dispatch(setLocations(data?.payload?.data?.requests));
      return;
    });
  };
}

export function getWeatherForSavedLocation(savedId = null) {
  return function (dispatch) {
    dispatch(setIsLocationsLoading(true));
    getWeather().then(data => {
      const {
        payload: {
          data: {details},
        },
      } = data;
      console.debug(
        'SET_SELECTED_LOCATION',
        JSON.stringify(data),
      );
      const filteredArray = details.filter(el => el?.value?._id == savedId);
      if (filteredArray?.length > 0) {
        dispatch(setSelectedLocation(filteredArray[0]));
        return;
      } else if (details?.length > 0) {
        dispatch(setSelectedLocation(details[0]));
        return;
      } else {
        dispatch(setSelectedLocation(null));
      }
    });
  };
}
