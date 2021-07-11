import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const formatDate = (epoch = new Date().getMilliseconds()) =>
  moment.unix(epoch).format('ddd, MMM D YYYY');
const formmatDateLong = (epoch = new Date().getMilliseconds()) =>
  moment.unix(epoch).format('llll');
const toCentigrade = kelvin => {
  const C = parseFloat(kelvin - 273.15).toPrecision(3);
  if (isNaN(C)) {
    return 0;
  }
  return C;
};
export {wp, hp, formatDate, toCentigrade, formmatDateLong};
