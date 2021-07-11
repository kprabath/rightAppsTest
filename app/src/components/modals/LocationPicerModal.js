import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utilities/functions';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RowItem = ({item, onPress, selectedLocation}) => (
  <TouchableOpacity
    onPress={() => {
      if (selectedLocation === item?._id) {
        return;
      }
      onPress(item._id);
    }}
    style={{alignItems: 'flex-start', height: 50, justifyContent: 'center'}}>
    <Text>{item?.city}</Text>
  </TouchableOpacity>
);

export default function LocationPickerModal({
  isVisible,
  onItemPress,
  selectedLocation,
  closeModal,
  getAllLocations,
  locations,
}) {
  useEffect(() => {
    getAllLocations();
  }, []);

  return (
    <Modal
      isVisible={isVisible}
      animationOut="slideOutDown"
      onBackdropPress={closeModal}
      animationIn="slideInUp">
      <View
        style={{
          backgroundColor: Colors.white,
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: wp(2),
          borderRadius: 20,
          minHeight:hp(40)
        }}>
        <TouchableOpacity
          onPress={closeModal}
          style={{
            alignItems: 'flex-end',
            width: '100%',
          }}>
          <Icon size={30} name="close" />
        </TouchableOpacity>
        <FlatList
          data={locations}
          renderItem={({item}) => (
            <RowItem
              selectedLocation={selectedLocation}
              onPress={onItemPress}
              item={item}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </Modal>
  );
}
