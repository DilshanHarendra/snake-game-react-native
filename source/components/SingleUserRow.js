import React from 'react';
import {Text, View} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import tw from 'twrnc';
function SingleUserRow() {
  return (
    <View style={tw`flex-row items-center py-2 hover:bg-gray-200`}>
      <UserAvatar size={40} name="John Doe" />
      <Text style={tw`ml-3 text-lg`}>Jhone Doe</Text>
    </View>
  );
}
export default SingleUserRow;
