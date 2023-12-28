import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const HomeScreen = ({navigation}) => {
  return (
    <View style={globalStyles.container}>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("ExchangeRates")}><Text style={styles.itemName}>Exchange Rates</Text></TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    width: '100%',
    backgroundColor: '#1e1e1e',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 18,
    color: '#fff',
  },
});
export default HomeScreen;
