import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { List, Text, FAB } from 'react-native-paper';
import { supabase } from '../lib/supabase';


const ExpensesScreen = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setExpenses(data);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text variant="headlineLarge">My Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item title={item.description} description={`$${item.amount} - ${item.category}`} />
        )}
      />
      
      {/* Floating Action Button */}
      <FAB
        style={{
          position: 'absolute',
          right: 20,
          bottom: 30,
          backgroundColor: '#6200ee',
        }}
        icon="plus"
        onPress={() => navigation.navigate('AddExpense')}
      />
    </View>
  );
};

export default ExpensesScreen;
