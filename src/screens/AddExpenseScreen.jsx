import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { supabase } from '../lib/supabase';


const AddExpenseScreen = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleAddExpense = async () => {
    const user = supabase.auth.getUser();
    
    if (!user) {
      Alert.alert('Error', 'You must be logged in to add an expense.');
      return;
    }

    const { error } = await supabase
      .from('expenses')
      .insert([{ user_id: user.id, description, amount, category }]);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Expense added!');
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text variant="headlineLarge">Add Expense</Text>
      <TextInput label="Description" value={description} onChangeText={setDescription} />
      <TextInput label="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <TextInput label="Category" value={category} onChangeText={setCategory} />
      <Button mode="contained" onPress={handleAddExpense} style={{ marginTop: 20 }}>
        Save Expense
      </Button>
    </View>
  );
};

export default AddExpenseScreen;
