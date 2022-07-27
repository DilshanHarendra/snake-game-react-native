import React from 'react';
import {TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';

function IconButton({onPress, icon, style}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{...tw`bg-blue-500 p-2 w-12 h-12 ${style}`}}>
      <Icon name={icon} size={30} color="#f7f9fa" />
    </TouchableOpacity>
  );
}
export default IconButton;
