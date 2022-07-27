/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {SafeAreaView} from 'react-native';
import SnakeGame from './source/SnakeGame';

import {Provider} from 'react-redux';
import store from './source/store/store';
const App: () => Node = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <SnakeGame />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
