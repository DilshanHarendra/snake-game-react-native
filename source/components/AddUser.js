import React from 'react';
import {Button, TextInput, Text, View} from 'react-native';
import tw from 'twrnc';

function AddUser() {
  return (
    <View style={tw`border border-gray-300 mt-5 px-2 py-5`}>
      <Text style={tw`text-xl font-semibold`}>Add New User</Text>

      <View style={tw`pt-3 items-center flex-row`}>
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-2 w-10/12`}
          placeholder="Type here to translate!"
        />
        <Button title="Save" />
      </View>
    </View>
  );
}
export default AddUser;
