import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {wp} from '../../utilities/functions';
import Colors from '../../theme/Colors';
import {loginToTheSystem} from '../../api/authServics';
import {setUserToken} from '../../redux/actions/authActions';

const InputView = ({placeHolder, onTextChange, value}) => (
  <TextInput
    style={styles.inputView}
    placeholder={placeHolder}
    onChangeText={onTextChange}
    value={value}
  />
);

const Button = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress} style={styles.btn}>
    <Text style={styles.loginTxt}>{title}</Text>
  </TouchableOpacity>
);

const LoginScreen = props => {
  const [email, setEmail] = useState(null);
  const [psw, setPsw] = useState(null);

  const login = () => {
    if (!email || !psw) {
      return;
    }
    loginToTheSystem({emailAddress: email.toLowerCase(), password: psw}).then(
      res => {
        const {
          payload: {
            data: {accessToken},
            state,
          },
        } = res;
        if (state == 'login.success') {
          props.dispatch(setUserToken(accessToken));
        }
      },
    ).catch(err=>alert("Login error"));
  };

  return (
    <View style={styles.container}>
      <InputView
        placeHolder={'Enter Email'}
        value={email}
        onTextChange={email => setEmail(email)}
      />
      <InputView
        placeHolder={'Enter password'}
        value={psw}
        onTextChange={psw => setPsw(psw)}
      />
      <Button title={'Login'} onPress={login} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(5),
  },
  inputView: {
    padding: wp(4),
    marginVertical: 10,
    width: '100%',
    backgroundColor: Colors.white,
    color:'#000',
  },
  btn: {
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 30,
    backgroundColor: Colors.grey,
  },
  loginTxt: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default connect(null)(LoginScreen);
