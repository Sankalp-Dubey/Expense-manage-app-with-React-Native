import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../lib/supabase';

const AddFriendModal = ({ route, navigation }) => {
  const { groupId } = route.params; // Get group ID from navigation
  const [email, setEmail] = useState('');

  const sendInvite = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user) return Alert.alert("Error", "User not found");

    // Insert into the friends table
    const { error } = await supabase.from('friends').insert([
      { user_id: user.user.id, friend_email: email, group_id: groupId }
    ]);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Friend invited to the group!");
      navigation.goBack();
    }
  };

  return (
    <View>
      <TextInput value={email} onChangeText={setEmail} placeholder="Friend's Email" />
      <Button title="Invite Friend" onPress={sendInvite} />
    </View>
  );
};

export default AddFriendModal;
