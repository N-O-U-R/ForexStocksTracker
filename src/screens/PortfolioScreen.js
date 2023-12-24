import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const PortfolioScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Portfolio Screen</Text>
      {/* Portfolio content goes here */}
    </View>
  );
};

export default PortfolioScreen;
