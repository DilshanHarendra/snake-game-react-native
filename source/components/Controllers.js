import React from 'react';
import {Button, View} from 'react-native';
import tw from 'twrnc';

function Controllers() {
  return (
    <View>
      <Button title={'Up'} style={tw`bg-blue-500 text-white`} />
      <View style={tw`flex-row`}>
        <View style={{flex: 1}}>
          <Button title={'Left'} style={tw`bg-blue-500 text-white`} />
        </View>
        <View style={{flex: 1}}>
          <Button title={'Right'} style={tw`bg-blue-500 text-white`} />
        </View>
      </View>
      <Button title={'Down'} style={tw`bg-blue-500 text-white`} />
    </View>
  );
}
export default Controllers;
