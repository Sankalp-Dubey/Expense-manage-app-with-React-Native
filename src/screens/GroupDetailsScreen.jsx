import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { List, Text, FAB, TextInput, Button, Dialog, Portal } from 'react-native-paper';
import { supabase } from '../lib/supabase';


const GroupDetailsScreen = ({ route }) => {
  const { groupId } = route.params;
  const [friends, setFriends] = useState([]);
  const [visible, setVisible] = useState(false);
  const [friendEmail, setFriendEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    const { data, error } = await supabase
      .from('group_members')
      .select('id, user_email')
      .eq('group_id', groupId);

    if (error) console.error(error);
    else setFriends(data);
  };

  const handleAddFriend = async () => {
    if (!friendEmail) {
      Alert.alert('Error', 'Email is required.');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('group_members')
      .insert([{ group_id: groupId, user_email: friendEmail }])
      .select();

    setLoading(false);
    setVisible(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Friend added successfully!');
      setFriends([...friends, ...data]);
      setFriendEmail('');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text variant="headlineLarge">Group Members</Text>

      <FlatList
        data={friends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <List.Item title={item.user_email} />}
      />

      {/* Floating Action Button */}
      <FAB
        style={{ position: 'absolute', right: 20, bottom: 30, backgroundColor: '#6200ee' }}
        icon="account-plus"
        onPress={() => setVisible(true)}
      />

      {/* Add Friend Dialog */}
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Add Friend</Dialog.Title>
          <Dialog.Content>
            <TextInput label="Friend's Email" value={friendEmail} onChangeText={setFriendEmail} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button loading={loading} onPress={handleAddFriend}>
              Add
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default GroupDetailsScreen;
