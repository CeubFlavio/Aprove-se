import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { store, persistor } from './src/Store'

import MainStack from './src/navigators/MainStack';

export default App = ()=> {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar backgroundColor="#191A1C" barStyle='light-content' />
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};