import React from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {hp} from '../../utilities/functions';
import Colors from '../../theme/Colors';

export default function FetchModal({isVisible}) {
  return (
    <Modal
      isVisible={isVisible}
      animationOut="slideOutDown"
      animationIn="slideInUp">
      <View style={styles.container}>
        <Text style={styles.text}>
          Fetching Weather data for your current location.
        </Text>
        <ActivityIndicator size={30} color={Colors.darkGrey} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  container: {
    minHeight: hp(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
});
