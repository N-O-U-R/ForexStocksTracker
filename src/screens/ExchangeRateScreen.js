import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import ExchangeRate from '../components/ExchangeRate'; 

const ExchangeRatesScreen = ({navigation}) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ExchangeRate fromCurrency="USD" toCurrency="EUR" navigation={navigation} />
            <ExchangeRate fromCurrency="GBP" toCurrency="USD" navigation={navigation}/>
            <ExchangeRate fromCurrency="EUR" toCurrency="USD" navigation={navigation}/>
            <ExchangeRate fromCurrency="EUR" toCurrency="TRY" navigation={navigation}/>
            <ExchangeRate fromCurrency="USD" toCurrency="TRY" navigation={navigation}/>
        </ScrollView>   
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
    },
    item: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
    }
});

export default ExchangeRatesScreen;
