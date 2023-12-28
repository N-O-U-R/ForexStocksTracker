import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import PortfolioScreen from './PortfolioScreen';
import AlertsScreen from './AlertsScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();
export default function Tracker() {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#121212',},
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#808080',
          headerStyle: { backgroundColor: '#121212', },
          headerTintColor: '#fff',
          headerTitleAlign: 'center', // Add this line to center the header titles
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Portfolio" component={PortfolioScreen} />
        <Tab.Screen name="Alerts" component={AlertsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
  );
}
