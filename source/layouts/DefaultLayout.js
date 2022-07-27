import React from 'react';
import {View} from 'react-native';
import {Outlet} from 'react-router-native';

function DefaultLayout() {
  return (
    <View>
      <Outlet />
    </View>
  );
}

export default DefaultLayout;
