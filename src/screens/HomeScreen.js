import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
// Import the function from notifications.js
import { sendNotification } from '../../notifications'; // Adjust the path as necessary

// Define the token and message

const HomeScreen = ({ navigation }) => {
  const testToken = 'ExponentPushToken[wLQ-10Gzi78lhHLEyM3BIy]';
  const testMessage = 'This is a test notification from the system.';

  // Call the function
  sendNotification(testToken, testMessage)
    .then(() => console.log('Notification sent successfully'))
    .catch(error => console.error('Error sending notification:', error));

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("ExchangeRates")}><Text style={styles.itemName}>Forex</Text></TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("StockQuote")}><Text style={styles.itemName}>Stocks</Text></TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => sendNotification()}><Text style={styles.itemName}>Notification</Text></TouchableOpacity>
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
