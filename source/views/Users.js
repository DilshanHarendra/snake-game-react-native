import React from 'react';
import {FlatList, Text, View} from 'react-native';
import tw from 'twrnc';
import SingleUserRow from '../components/SingleUserRow';
import AddUser from '../components/AddUser';
import {useSelector} from 'react-redux';

function Users() {
  const users = useSelector(state => state.users.users).sort((a, b) =>
    a.score > b.score ? -1 : 1,
  );

  return (
    <View style={tw`px-2`}>
      <Text style={tw`text-4xl font-semibold ml-2`}>Users</Text>
      <AddUser />
      <View style={tw`pt-5`}>
        <FlatList
          data={users}
          renderItem={({item}) => <SingleUserRow user={item} />}
        />
      </View>
    </View>
  );
}
export default Users;
