import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const ProfileScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Profile Screen</Text>
      {/* Profile content goes here */}
    </View>
  );
};

export default ProfileScreen;
