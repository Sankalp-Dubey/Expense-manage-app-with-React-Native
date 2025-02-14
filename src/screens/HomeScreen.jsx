import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';

const HomeScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const { data, error } = await supabase.from('groups').select('*');
      if (error) console.error(error);
      else setGroups(data);
    };

    fetchGroups();
  }, []);

  return (
    <View>
      <Button title="Add Group" onPress={() => navigation.navigate('AddGroup')} />
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('GroupScreen', { groupId: item.id })}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
