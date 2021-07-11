import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStack, HomeStack} from '../navigations';

function Routes(props) {
  const Stack = createStackNavigator();

  const getRoutes = () => {
    if (!props.token) {
      return <Stack.Screen name={'auth'} component={AuthStack} />;
    }
    return <Stack.Screen name={'dashboard'} component={HomeStack} />;
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {getRoutes()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
  };
};

export default connect(mapStateToProps)(Routes);
