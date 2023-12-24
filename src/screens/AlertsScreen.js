import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const AlertsScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Alerts Screen</Text>
      {/* Alerts content goes here */}
    </View>
  );
};

export default AlertsScreen;
