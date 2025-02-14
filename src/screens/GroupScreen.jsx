import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';

const GroupScreen = ({ route, navigation }) => {
  const { groupId } = route.params;
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const { data, error } = await supabase
        .from('friends')
        .select('*')
        .eq('group_id', groupId)
        .eq('status', 'accepted');

      if (!error) setFriends(data);
    };

    fetchFriends();
  }, []);

  return (
    <View style={styles.container}>
      {/* Group Title */}
      <Text style={styles.title}>Group Details</Text>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button 
          title="Add Friend" 
          onPress={() => navigation.navigate('AddFriend', { groupId })} 
          color="#007bff"
        />
        <Button 
          title="Add Expense" 
          onPress={() => navigation.navigate('AddExpense', { groupId })} 
          color="#28a745"
        />
      </View>

      {/* Friends List */}
      <Text style={styles.subTitle}>Friends in this Group:</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.friendItem}>{item.friend_email}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  friendItem: {
    fontSize: 16,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default GroupScreen;
