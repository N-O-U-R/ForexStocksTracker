import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons

// Import your screen components
import HomeScreen from './HomeScreen';
import PortfolioScreen from './PortfolioScreen';
import AlarmsScreen from './AlarmsScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

export default function Tracker() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: '#121212' },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#808080',
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home'; // 'home' for both focused and unfocused
          } else if (route.name === 'Portfolio') {
            iconName = focused ? 'work' : 'work'; // Use appropriate icons
          } else if (route.name === 'Alarms') {
            iconName = focused ? 'notifications' : 'notifications-none';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <MaterialIcons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      <Tab.Screen name="Alarms" component={AlarmsScreen} options={{title:'Price Alarms'}}/>
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
