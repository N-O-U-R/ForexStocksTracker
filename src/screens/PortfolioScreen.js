import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const PortfolioScreen = () => {
  // Mock data for portfolio items
  const portfolioItems = [
    { id: '1', name: 'USD', value: '10,000' },
    { id: '2', name: 'EUR', value: '8,500' },
    { id: '3', name: 'TRY', value: '15,000' },
  ];

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      {portfolioItems.map(item => (
        <View key={item.id} style={styles.item}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemValue}>{item.value}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    backgroundColor: '#2f2f2f',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 18,
    color: '#fff',
  },
  itemValue: {
    fontSize: 14,
    color: '#a9a9a9',
  },
});

export default PortfolioScreen;
