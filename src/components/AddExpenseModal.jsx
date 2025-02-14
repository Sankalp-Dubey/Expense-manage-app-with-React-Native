import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { supabase } from '../lib/supabase';

const AddExpenseModal = ({ route, navigation }) => {
  const { groupId } = route.params;
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const addExpense = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from('expenses').insert([{ group_id: groupId, user_id: user.user.id, amount, description }]);
    if (error) console.error(error);
    else navigation.goBack();
  };

  return (
    <View>
      <TextInput value={amount} onChangeText={setAmount} placeholder="Amount" keyboardType="numeric" />
      <TextInput value={description} onChangeText={setDescription} placeholder="Description" />
      <Button title="Add Expense" onPress={addExpense} />
    </View>
  );
};

export default AddExpenseModal;
