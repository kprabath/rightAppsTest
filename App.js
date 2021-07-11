import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Routes from './app/src/containers/Routes';
import {Provider} from 'react-redux';
import {store, persistor} from './app/src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const App: () => Node = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default App;
