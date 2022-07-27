import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import tw from 'twrnc';
import {useNavigate} from 'react-router-native';
import {setCurrentUser} from '../store/actions/user';

function SingleUserRow({user}) {
  let navigate = useNavigate();

  function clickHandler() {
    setCurrentUser(user);
    navigate('/player', {replace: true});
  }

  return (
    <TouchableOpacity onPress={clickHandler}>
      <View style={tw`flex-row items-center py-2  hover:bg-gray-200`}>
        <UserAvatar size={40} style={tw`w-10`} name={user.name} />
        <View style={tw`ml-3`}>
          <Text style={tw`text-lg font-semibold`}>{user.name}</Text>
          <Text style={tw`text-gray-500`}>Score {user.score}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default SingleUserRow;
