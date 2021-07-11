import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Colors from '../../theme/Colors';
import {wp} from '../../utilities/functions';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RowItem = ({item, onDelete}) => (
  <TouchableOpacity
    style={{
      alignItems: 'center',
      height: 50,
      flexDirection: 'row',
    }}>
    <Text style={{flex: 0.7}}>{item?.city}</Text>
    <TouchableOpacity
      onPress={() => onDelete(item)}
      style={{flex: 0.3, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
      <Icon size={20} name="delete" />
    </TouchableOpacity>
  </TouchableOpacity>
);

const CityInputView = props => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
    }}>
    <TextInput
      autoCorrect={false}
      value={props.value}
      onChangeText={props.onChange}
      placeholder="City name"
      style={{flex: 1, padding: 10,color: '#000'}}
    />
    <TouchableOpacity onPress={props.onAdd}>
      <Icon name={'add'} size={20} />
    </TouchableOpacity>
  </View>
);

export default function AddNewLocationModal({
  isVisible,
  onDelete,
  closeModal,
  onAdd,
  locations,
  getAllLocations,
}) {
  const [text, setText] = useState(null);
  useEffect(() => {
    if (locations?.length > 0) {
      return;
    }
    getAllLocations();
  }, []);

  return (
    <Modal
      isVisible={isVisible}
      animationOut="slideOutDown"
      onBackdropPress={closeModal}
      animationIn="slideInUp">
      <View style={styles.container}>
        <TouchableOpacity
          onPress={closeModal}
          style={{
            alignItems: 'flex-end',
            width: '100%',
          }}>
          <Icon size={30} name="close" />
        </TouchableOpacity>
        <Text style={{fontSize: 18}}>Locations</Text>
        <View style={{width: '70%'}}>
          <FlatList
            ListHeaderComponent={
              <CityInputView
                value={text}
                onChange={text => setText(text)}
                onAdd={() => onAdd(text)}
              />
            }
            data={locations}
            renderItem={({item}) => <RowItem onDelete={onDelete} item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: wp(2),
    paddingBottom: wp(10),
    backgroundColor: Colors.white,
    borderRadius: 20,
    alignItems: 'center',
  },
});
