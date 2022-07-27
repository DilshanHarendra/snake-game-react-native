import React from 'react';
import {FlatList, Text, View} from 'react-native';
import tw from 'twrnc';
import SingleUserRow from '../components/SingleUserRow';
import AddUser from '../components/AddUser';

function Users() {
  return (
    <View style={tw`px-2`}>
      <Text style={tw`text-4xl font-semibold ml-2`}>Users</Text>

      <AddUser />
      <View style={tw`pt-5`}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <SingleUserRow />}
        />
      </View>
    </View>
  );
}
export default Users;
