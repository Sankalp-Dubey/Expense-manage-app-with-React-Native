import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import HomeScreen from '../screens/HomeScreen';
import GroupDetailsScreen from '../screens/GroupDetailsScreen';
import AddExpenseModal from '../components/AddExpenseModal';
import AddGroupModal from '../components/AddGroupModal';
import GroupScreen from '../screens/GroupScreen';
import AddFriendModal from '../components/AddFriendModal';
import FriendsScreen from '../screens/FriendsScreen';
import BottomTabs from './BottomTabs';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
