import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { supabase } from '../lib/supabase';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Login Failed', error.message);
    } else {
      Alert.alert('Success', 'Logged in successfully!');
      navigation.replace('Expenses'); // Redirect to the main app screen
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text variant="headlineLarge">Login</Text>
      <TextInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleLogin} loading={loading} style={{ marginTop: 20 }}>
        Login
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('Signup')} style={{ marginTop: 10 }}>
        Don't have an account? Sign up
      </Button>
    </View>
  );
};

export default LoginScreen;
