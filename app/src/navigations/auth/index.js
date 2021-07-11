import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../../containers';

export default function AuthStack(props) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="Authentication" component={LoginScreen} />
    </Stack.Navigator>
  );
}
