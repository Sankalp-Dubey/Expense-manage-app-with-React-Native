import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { supabase } from '../lib/supabase';

const AddGroupModal = ({ navigation }) => {
  const [groupName, setGroupName] = useState('');

  const createGroup = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from('groups').insert([{ name: groupName, created_by: user.user.id }]);
    if (error) console.error(error);
    else navigation.goBack();
  };

  return (
    <View>
      <TextInput value={groupName} onChangeText={setGroupName} placeholder="Group Name" />
      <Button title="Create" onPress={createGroup} />
    </View>
  );
};

export default AddGroupModal;
