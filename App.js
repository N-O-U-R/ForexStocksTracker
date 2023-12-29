import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login'; 
import SignUpScreen from './src/screens/SignUp'; 
import TrackerScreen from './src/screens/Tracker';
import ChangePasswordScreen from './src/screens/ChangePassword';
import ExchangeRatesScreen from './src/screens/ExchangeRateScreen';
import CurrencyDetailsScreen from './src/screens/CurrencyDetailsScreen';
import StockQuoteScreen from './src/screens/StockQuoteScreen';
import StockDetailsScreen from './src/screens/StockDetailsScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Tracker" component={TrackerScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white' }}/>
        <Stack.Screen name ="ExchangeRates" component={ExchangeRatesScreen} options={{headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white' , title:'Exchange Rates'}}/>
        <Stack.Screen name ="StockQuote" component={StockQuoteScreen} options={{headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white' , title:'Stock Quotes'}}/>
        <Stack.Screen name ="CurrencyDetails" component={CurrencyDetailsScreen} options={{headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white',title:''}}/>
        <Stack.Screen name ="StockDetails" component={StockDetailsScreen} options={{headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white',title:''}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
