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

const App: () => Node = () => {
  return (
    <SafeAreaView>
      <SnakeGame />
    </SafeAreaView>
  );
};

export default App;
