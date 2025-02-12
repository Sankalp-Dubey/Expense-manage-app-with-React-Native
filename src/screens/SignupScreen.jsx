import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { supabase } from '../lib/supabase';


const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Check your email to confirm your account!');
      navigation.navigate('Login'); // Redirect to Login
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text variant="headlineLarge">Sign Up</Text>
      <TextInput 
        label="Email" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address"
      />
      <TextInput 
        label="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      <Button mode="contained" onPress={handleSignUp} style={{ marginTop: 20 }}>
        Sign Up
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Button>
    </View>
  );
};

export default SignupScreen;
