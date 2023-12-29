import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const HomeScreen = ({navigation}) => {
  return (
    <View style={globalStyles.container}>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("ExchangeRates")}><Text style={styles.itemName}>Forex</Text></TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("StockQuote")}><Text style={styles.itemName}>Stocks</Text></TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    width: '100%',
    backgroundColor: '#2f2f2f',
    padding: 22,
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
