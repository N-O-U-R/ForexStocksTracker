import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

import LoginScreen from './src/screens/Login';
import SignUpScreen from './src/screens/SignUp';
import TrackerScreen from './src/screens/Tracker';
import ChangePasswordScreen from './src/screens/ChangePassword';
import ExchangeRatesScreen from './src/screens/ExchangeRateScreen';
import CurrencyDetailsScreen from './src/screens/CurrencyDetailsScreen';
import StockQuoteScreen from './src/screens/StockQuoteScreen';
import StockDetailsScreen from './src/screens/StockDetailsScreen';
import AddInvestmentScreen from './src/screens/AddInvestmentScreen';
import AddCurrencyScreen from './src/screens/AddCurrencyScreen';
import CurrencyItemDetailsScreen from './src/screens/CurrencyItemDetailsScreen';
import StockItemDetailsScreen from './src/screens/StockItemDetailsScreen';
import AdminScreen from './src/screens/AdminScreen'; // Admin screen
import AdminCurrencyManagerScreen from './src/screens/AdminCurrencyManagerScreen';
import AdminStockManagerScreen from './src/screens/AdminStockManagerScreen';
import AdminUserManagerScreen from './src/screens/AdminUserManagerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true); // New state to track initialization

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch the user's role
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        const userRole = userDoc.exists() ? userDoc.data().role : 'user';

        // Navigate based on the role
        if (userRole === 'admin') {
          navigationRef.current?.navigate("Admin");
        } else {
          navigationRef.current?.navigate("Tracker");
        }
      }
      setInitializing(false); // Indicate initialization is complete
    });

    return unsubscribe;
  }, []);

  // Reference for navigation
  const navigationRef = React.useRef();

  if (initializing) {
    return null; // or a loading indicator
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="AdminCurrencyManager" component={AdminCurrencyManagerScreen} options={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white', title: 'Currency Managment' }} />
        <Stack.Screen name="AdminStockManager" component={AdminStockManagerScreen} options={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white', title: 'Stock Managment' }} />
        <Stack.Screen name="AdminUserManager" component={AdminUserManagerScreen} options={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white', title: 'User Managment' }} />

        <Stack.Screen name="Tracker" component={TrackerScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white' }} />
        <Stack.Screen name="ExchangeRates" component={ExchangeRatesScreen} options={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white', title: 'Exchange Rates' }} />
        <Stack.Screen name="CurrencyDetails" component={CurrencyDetailsScreen} options={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white', title: '' }} />
        <Stack.Screen name="StockQuote" component={StockQuoteScreen} options={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white', title: 'Stock Quotes' }} />
        <Stack.Screen name="StockDetails" component={StockDetailsScreen} options={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white', title: '' }} />
        <Stack.Screen name="AddInvestment" component={AddInvestmentScreen} options={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white', title: 'Add Investment' }} />
        <Stack.Screen name="AddCurrency" component={AddCurrencyScreen} options={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white', title: 'Add Currency' }} />
        <Stack.Screen name="CurrencyItemDetails" component={CurrencyItemDetailsScreen} options={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white', title: 'Details' }} />
        <Stack.Screen name="StockItemDetails" component={StockItemDetailsScreen} options={{ headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white', title: 'Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});