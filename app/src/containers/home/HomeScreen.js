import React, {createRef, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  PermissionsAndroid,
  InteractionManager,
} from 'react-native';
import Colors from '../../theme/Colors';
import TriangleDown from 'react-native-vector-icons/Octicons';
import MenuIcon from 'react-native-vector-icons/SimpleLineIcons';
import AddIcon from 'react-native-vector-icons/MaterialIcons';
import isNull from 'lodash/isNull';
import {
  formatDate,
  formmatDateLong,
  hp,
  toCentigrade,
  wp,
} from '../../utilities/functions';
import {connect} from 'react-redux';
import LocationPickerModal from '../../components/modals/LocationPicerModal';
import AddNewLocationModal from '../../components/modals/AddNewLocationModal';
import {
  getAvailableLocations,
  getWeatherForSavedLocation,
} from '../../redux/middleware-funcs/applicationMIddleware';
import {addLocation, deleteLocation} from '../../api/applicationService';
import {
  addUserLocation,
  deleteUserLocation,
  saveSelectedLocation,
  setSelectedLocation,
} from '../../redux/actions/applicationReducerActions';
import Geolocation from 'react-native-geolocation-service';
import {DENIED} from '../../constants';
import {getLocationData} from '../../api/locationService';
import FetchModal from '../../components/modals/FetchModal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({
  onPressDrawer,
  onLocationIconPress,
  onAddLocation,
  onAddBtnPress,
  onDeleteLocation,
  selectedCity,
}) => (
  <View style={styles.header}>
    <TouchableOpacity
      onPress={onPressDrawer}
      style={{
        position: 'absolute',
        borderRadius: 20,
        left: 20,
      }}>
      <MenuIcon name="menu" size={20} />
    </TouchableOpacity>

    <TouchableOpacity
      onPress={onLocationIconPress}
      style={{height: 40, borderRadius: 10}}>
      <View style={styles.middleBtn}>
        <Text>{selectedCity}</Text>
        <TriangleDown style={{marginLeft: 10}} size={20} name="triangle-down" />
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={onAddLocation}
      style={{position: 'absolute', right: 20}}>
      <AddIcon name="add" size={25} />
    </TouchableOpacity>
  </View>
);

const Banner = ({
  headerText,
  middleText,
  bottomText,
  hasPermission,
  onLocationPress,
}) => (
  <View style={styles.banner}>
    <TouchableOpacity onPress={onLocationPress} style={styles.location}>
      <Icon name={hasPermission ? 'location-on' : 'location-off'} size={30} />
    </TouchableOpacity>
    <Text style={{fontSize: 18}}>{headerText}</Text>
    <View style={{alignItems: 'center'}}>
      <Text style={{fontSize: 28, fontWeight: 'bold', marginTop: wp(5)}}>
        {middleText}
      </Text>
      <Text style={{marginTop: 10, fontSize: 16}}>{bottomText}</Text>
    </View>
  </View>
);

const ContentViewText = ({description, value}) => (
  <View style={styles.contentViewText}>
    <Text style={{fontSize: 16}}>{description}</Text>
    <Text style={{fontSize: 11}}>{value}</Text>
  </View>
);

const ContentView = ({title1, title2, value1, value2}) => (
  <View style={styles.contentView}>
    <ContentViewText value={value1} description={title1} />
    <ContentViewText description={title2} value={value2} />
  </View>
);

const MainContainer = ({mainValue1, mainValue2, sunRiseAt, sunSetsAt}) => (
  <View style={styles.mainContainer}>
    <ContentView
      title1={'temparature'}
      title2={'feels like'}
      value1={mainValue1}
      value2={mainValue2}
    />
    <ContentView
      title1={'Sun rise At'}
      title2={'Sun Sets at'}
      value1={sunRiseAt}
      value2={sunSetsAt}
    />
  </View>
);

const HomeScreen = props => {
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [isAddNewLocation, setIsAdNewLocationModalVisible] = useState(false);
  const [showingFetchModal, setShowFetchModal] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    props.getWeatherForSavedLocation(props.selectedLocation);
  }, [props.selectedLocation]);

  useEffect(() => {
    requestPermission().then(hasPermission =>
      setHasLocationPermission(hasPermission),
    );
  }, []);

  useEffect(() => {
    if (!props.isLocationLoading) {
      if (!props.selectedLocation) {
        setShowFetchModal(true);
        accessUserLocation();
      }
    }
  }, [props.isLocationLoading]);

  const onLocationPress = () => {
    accessUserLocation();
  };

  const accessUserLocation = () => {
    if (hasLocationPermission) {
      setHasLocationPermission(true);
      Geolocation.getCurrentPosition(
        position => {
          const address = getLocationData(
            position?.coords?.latitude,
            position?.coords?.longitude,
          );
          addLocation({city: address?.address})
            .then(data => {
              props.dispatch(saveSelectedLocation(data?.data?._id));
              setTimeout(()=>{
                setShowFetchModal(false);
              },2000)
            })
            .catch(er => {
              setShowFetchModal(false);
              setTimeout(() => {
                console.debug('error while adding your GPS location');
              }, [2000]);
            });
        },
        error => {
          // See error code charts below.
          console.debug(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  const changeSelectedLocation = locationId => {
    props.dispatch(saveSelectedLocation(locationId));
    setIsLocationModalVisible(false);
  };

  const requestPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        return Geolocation.requestAuthorization('whenInUse').then(state => {
          if (state === DENIED) {
            return false;
          }
          return true;
        });
      }
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Weather App',
          message: 'This App needs to Access your location',
          buttonNegative: 'Cancel',
          buttonPositive: 'Ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // To Check, If Permission is granted
        return true;
      }
      return false;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const addNewLocation = text => {
    if (!text) {
      return;
    }
    addLocation({city: text}).then(data => {
      if (data.payload?.state == 'location.saved') {
        if (isNull(props.selectedLocation)) {
          props.dispatch(saveSelectedLocation(data?.data?._id));
        }
        props.dispatch(addUserLocation(data?.data));
        setIsAdNewLocationModalVisible(false);
      } else {
        alert('Error when Adding location');
        setIsAdNewLocationModalVisible(false);
      }
    });
  };
  const onDeleteLocation = item => {
    deleteLocation(item?._id)
      .then(res => {
        if (item?._id == props.selectedLocation) {
          props.dispatch(saveSelectedLocation(null));
        }
        props.dispatch(deleteUserLocation(item));
      })
      .catch(er => console.debug(er));
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Header
        selectedCity={props?.savedLocation?.value?.city}
        onPressDrawer={() => props.navigation.openDrawer()}
        onAddLocation={() => setIsAdNewLocationModalVisible(true)}
        onLocationIconPress={() => setIsLocationModalVisible(true)}
      />
      <View style={styles.subContent}>
        <Banner
          headerText={formatDate(props?.savedLocation?.value?.weather?.dt)}
          hasPermission={hasLocationPermission}
          onLocationPress={onLocationPress}
          middleText={`${toCentigrade(
            props?.savedLocation?.value?.weather?.main?.temp,
          )}°C`}
          bottomText={
            props?.savedLocation?.value?.weather?.weather[0]?.description
          }
        />
        <MainContainer
          mainValue1={`${toCentigrade(
            props?.savedLocation?.value?.weather?.main?.temp_min,
          )}°C to ${toCentigrade(
            props?.savedLocation?.value?.weather?.main?.temp_max,
          )}°C`}
          mainValue2={`${toCentigrade(
            props?.savedLocation?.value?.weather?.main?.feels_like,
          )}°C`}
          sunRiseAt={formmatDateLong(
            props?.savedLocation?.value?.weather?.sys?.sunrise,
          )}
          sunSetsAt={formmatDateLong(
            props?.savedLocation?.value?.weather?.sys?.sunset,
          )}
        />
      </View>
      {isLocationModalVisible && (
        <LocationPickerModal
          selectedLocation={props.selectedLocation}
          onItemPress={changeSelectedLocation}
          locations={props.locations}
          getAllLocations={() => props.getAvailableLocations()}
          isVisible={isLocationModalVisible}
          closeModal={() => setIsLocationModalVisible(false)}
        />
      )}
      {isAddNewLocation && (
        <AddNewLocationModal
          isVisible={isAddNewLocation}
          getAllLocations={() => props.getAvailableLocations()}
          locations={props.locations}
          onAdd={addNewLocation}
          onDelete={onDeleteLocation}
          closeModal={() => setIsAdNewLocationModalVisible(false)}
        />
      )}
      {showingFetchModal && <FetchModal isVisible={showingFetchModal} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // paddingHorizontal: wp(5)
  },
  header: {
    zIndex: 4,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.grey,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  subContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    height: hp(40),
    backgroundColor: Colors.grey,
    width: '90%',
    marginTop: hp(5),
    paddingHorizontal: wp(5),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  contentView: {
    backgroundColor: Colors.darkGrey,
    height: hp(15),
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    backgroundColor: Colors.grey,
    padding: wp(3),
    alignItems: 'center',
    width: '90%',
    borderRadius: 10,
    height: hp(20),
  },
  location: {position: 'absolute', left: 10, top: 10},
  contentViewText: {alignItems: 'center', marginTop: 10},
});

const mapStateToProps = state => {
  return {
    savedLocation: state.applicationReducer.selectedLocation,
    selectedLocation: state.persistReducer.savedLocation,
    locations: state.applicationReducer.locations,
    isLocationLoading: state.applicationReducer.isLocationLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    getWeatherForSavedLocation: selectedLocation =>
      dispatch(getWeatherForSavedLocation(selectedLocation)),
    getAvailableLocations: () => dispatch(getAvailableLocations()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
