import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login'; 
import SignUpScreen from './src/screens/SignUp'; 
import TrackerScreen from './src/screens/Tracker';
import ChangePasswordScreen from './src/screens/ChangePassword';
import ExchangeRatesScreen from './src/screens/ExchangeRateScreen';



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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
