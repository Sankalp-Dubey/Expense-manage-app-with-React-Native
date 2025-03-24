import * as React from 'react';
import {
  createStaticNavigation,
  NavigationContainer,
} from '@react-navigation/native';
import {View, Platform} from 'react-native';
import {useLinkBuilder, useTheme} from '@react-navigation/native';
import {Text, PlatformPressable} from '@react-navigation/elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Icon} from '@rneui/themed';
import ExpensesScreen from '../screens/ExpensesScreen';
import GroupScreen from '../screens/GroupScreen';
import GroupDetailsScreen from '../screens/GroupDetailsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

function MyTabBar({state, descriptors, navigation}) {
  const {colors} = useTheme();
  const {buildHref} = useLinkBuilder();

  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={index}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <Text style={{color: isFocused ? colors.primary : colors.text}}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  <Ionicons name="home" color='black' size={25} />
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Groups') {
          iconName = focused
            ? 'people'
            : 'people-outline';
        } else if (route.name === 'Friends') {
          iconName = focused ? 'person' : 'person-outline';
        }

        else if (route.name === 'Activity') {
          iconName = focused ? 'analytics' : 'analytics-outline';
        }

        else if (route.name === 'Account') {
          iconName = focused ? 'settings' : 'settings-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'green',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Groups" component={HomeStack} />
    <Tab.Screen name="Friends" component={ProfileScreen} />
    <Tab.Screen name="Activity" component={ProfileScreen} />
    <Tab.Screen name="Account" component={ProfileScreen} />
  </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ExpensesScreen"
        component={ExpensesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GroupScreen"
        options={{headerShown: false}}
        component={GroupScreen}
      />
      <Stack.Screen
        name="GroupDetailsScreen"
        options={{headerShown: false}}
        component={GroupDetailsScreen}
      />
    </Stack.Navigator>
  );
};
