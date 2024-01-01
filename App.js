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
import AddInvestmentScreen from './src/screens/AddInvestmentScreen';
import AddCurrencyScreen from './src/screens/AddCurrencyScreen';
import CurrencyItemDetailsScreen from './src/screens/CurrencyItemDetailsScreen';
import StockItemDetailsScreen from './src/screens/StockItemDetailsScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Tracker" component={TrackerScreen} options={{headerShown: false, gestureEnabled:false}}/>
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white' }}/>
        <Stack.Screen name ="ExchangeRates" component={ExchangeRatesScreen} options={{headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white' , title:'Exchange Rates'}}/>
        <Stack.Screen name ="StockQuote" component={StockQuoteScreen} options={{headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white' , title:'Stock Quotes'}}/>
        <Stack.Screen name ="CurrencyDetails" component={CurrencyDetailsScreen} options={{headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white',title:''}}/>
        <Stack.Screen name ="StockDetails" component={StockDetailsScreen} options={{headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white',title:''}}/>
        <Stack.Screen name ="AddInvestment" component={AddInvestmentScreen} options={{headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white',title:'Add Investment'}}/>
        <Stack.Screen name ="AddCurrency" component={AddCurrencyScreen} options={{headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white',title:'Add Currency'}}/>
        <Stack.Screen name ="CurrencyItemDetails" component={CurrencyItemDetailsScreen} options={{headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white',title:'Details'}}/>
        <Stack.Screen name ="StockItemDetails" component={StockItemDetailsScreen} options={{headerStyle: { backgroundColor: '#121212' }, headerTintColor: 'white',title:'Details'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
