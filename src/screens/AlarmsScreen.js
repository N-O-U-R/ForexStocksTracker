import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { db, auth } from '../../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

const AlarmsScreen = () => {
  const [alarms, setAlarms] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAlarms = async () => {
    if (auth.currentUser) {
      setRefreshing(true);
      const q = query(collection(db, "users", auth.currentUser.uid, "alarms"));
      const querySnapshot = await getDocs(q);
      const fetchedAlarms = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAlarms(fetchedAlarms);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAlarms();
  }, []);

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={fetchAlarms}
        colors={['#FFFFFF']}  
        progressBackgroundColor="#000000"
      />
      }
    >
      {alarms.map(alarm => (
        <View key={alarm.id} style={styles.alertItem}>
          <Text style={styles.alertTitle}>{`${alarm.fromCurrency} to ${alarm.toCurrency} Alarm`}</Text>
          <Text style={styles.alertDetail}>{`Target Rate: ${alarm.targetRate}`}</Text>
        </View>
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e'
  },
  alertItem: {
    width: '95%',
    backgroundColor: '#2f2f2f',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    alignSelf: 'center'
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

export default AlarmsScreen;
