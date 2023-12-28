import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import ExchangeRate from '../components/ExchangeRate'; 

const ExchangeRatesScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ExchangeRate fromCurrency="USD" toCurrency="EUR" />
            <ExchangeRate fromCurrency="GBP" toCurrency="USD" />
            <ExchangeRate fromCurrency="EUR" toCurrency="USD" />
            <ExchangeRate fromCurrency="EUR" toCurrency="TRY" />
            <ExchangeRate fromCurrency="USD" toCurrency="TRY" />
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
