import React, {useEffect, useState} from 'react';
import {Button, TextInput, Text, View} from 'react-native';
import tw from 'twrnc';
import {addUser} from '../store/actions/userAction';
import {useSelector} from 'react-redux';

function AddUser() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const users = useSelector(state => state.users.users);

  function saveUser() {
    if (name) {
      if (!error) {
        setName('');
        addUser(name);
      }
    } else {
      setError('Invalid Name');
    }
  }

  useEffect(() => {
    setError('');
    if (name) {
      users.forEach(user => {
        if (user.name.toString().trim() == name.trim()) {
          setError('Name Already Exist');
        }
      });
    }
  }, [name]);

  return (
    <View style={tw`border border-gray-300 mt-5 px-2 py-5`}>
      <Text style={tw`text-xl font-semibold`}>Add New User</Text>

      <View style={tw`pt-3 items-start flex-row`}>
        <View style={tw` w-10/12`}>
          <TextInput
            style={tw`border border-gray-300 rounded-lg w-full  p-2`}
            placeholder="Name ...."
            onChangeText={text => setName(text)}
            defaultValue={name}
          />
          <Text style={tw`mt-3 text-red-500 font-semibold`}>{error}</Text>
        </View>
        <Button title="Save" onPress={saveUser} />
      </View>
    </View>
  );
}
export default AddUser;
