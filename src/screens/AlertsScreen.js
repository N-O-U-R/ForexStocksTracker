import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const AlertsScreen = () => {
  // Mock data for alerts
  const alerts = [
    { id: '1', title: 'USD Alert', detail: 'USD rate crossed 1.20' },
    { id: '2', title: 'EUR Alert', detail: 'EUR rate dropped below 0.85' },
  ];

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      {alerts.map(alert => (
        <View key={alert.id} style={styles.alertItem}>
          <Text style={styles.alertTitle}>{alert.title}</Text>
          <Text style={styles.alertDetail}>{alert.detail}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  alertItem: {
    width: '100%',
    backgroundColor: '#2f2f2f',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  alertTitle: {
    fontSize: 18,
    color: '#fff',
  },
  alertDetail: {
    fontSize: 14,
    color: '#a9a9a9',
  },
});

export default AlertsScreen;
