import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from '../../containers';
import SideNavDrawer from './Drawer';

export default function HomeStack(props) {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={props => <SideNavDrawer {...props} />}
      screenOptions={{headerTitleAlign: 'center'}}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
