import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { supabase } from '../lib/supabase';


const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      console.log("Signing up with:", email, password);
      const { data, error } = await supabase.auth.signUp({ email, password });
  
      if (error) {
        console.error("Signup Error:", error);
        Alert.alert('Error', error.message);
      } else {
        console.log("Signup Success:", data);
        Alert.alert('Success', 'Check your email to confirm your account!');
        navigation.navigate('Login');
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      Alert.alert("Something went wrong!");
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
