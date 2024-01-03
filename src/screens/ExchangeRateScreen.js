import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import ExchangeRate from '../components/ExchangeRate';

const ExchangeRatesScreen = ({ navigation }) => {
    const [exchangeRates, setExchangeRates] = useState([]);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            const querySnapshot = await getDocs(collection(db, "exchangeRates")); // Replace "exchangeRates" with your collection name
            const rates = [];
            querySnapshot.forEach((doc) => {
                rates.push(doc.data());
            });
            setExchangeRates(rates);
        };
        fetchExchangeRates();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {exchangeRates.map((rate, index) => (
                <ExchangeRate
                    key={index}
                    fromCurrency={rate.fromCurrency}
                    toCurrency={rate.toCurrency}
                    navigation={navigation}
                />
            ))}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#1e1e1e',
        alignItems: 'stretch',
    },
    item: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
    }
});

export default ExchangeRatesScreen;
