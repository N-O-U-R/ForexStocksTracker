import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const HomeScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
