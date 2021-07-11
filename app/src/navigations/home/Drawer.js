import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {Linking, TouchableOpacity, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {resetUserToken} from '../../redux/actions/authActions';

const Signout = ({onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      alignItems: 'center',
      paddingBottom: 10,
    }}>
    <Text style={{fontWeight: 'bold', fontSize: 18}}>Sign out</Text>
  </TouchableOpacity>
);

function SideNavDrawer(props) {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Signout onPress={() => props.dispatch(resetUserToken(null))} />
    </View>
  );
}

export default connect(null)(SideNavDrawer);
