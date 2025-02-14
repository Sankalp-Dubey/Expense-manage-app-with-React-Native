import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { supabase } from '../lib/supabase';

const FriendsScreen = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase.from('friends').select('*').eq('friend_email', user.user.email);
      
      if (error) console.error(error);
      else setFriends(data);
    };

    fetchFriends();
  }, []);

  const acceptInvite = async (id) => {
    const { error } = await supabase.from('friends').update({ status: 'accepted' }).eq('id', id);
    if (error) return Alert.alert("Error", error.message);
    
    setFriends(friends.map(f => (f.id === id ? { ...f, status: 'accepted' } : f)));
  };

  return (
    <View>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.friend_email} - {item.status}</Text>
            {item.status === 'pending' && <Button title="Accept" onPress={() => acceptInvite(item.id)} />}
          </View>
        )}
      />
    </View>
  );
};

export default FriendsScreen;
