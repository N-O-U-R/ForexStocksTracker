import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const ExchangeRate = ({ fromCurrency, toCurrency }) => {
    const [rate, setRate] = useState(0);

    const fetchExchangeRate = async () => {
        try {
            const response = await axios.get('https://real-time-finance-data.p.rapidapi.com/currency-exchange-rate', {
                params: {
                    from_symbol: fromCurrency,
                    to_symbol: toCurrency,
                    language: 'en'
                  },
                  headers: {
                    'X-RapidAPI-Key': '70e8d834b6mshdb8789fe3e0f469p1883a7jsn255256af8bf1',
                    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
                  }
            });
            setRate(response.data['data']['exchange_rate']);
        } catch (error) {
            console.error(error);
        }
    };
    

    useEffect(() => {
        fetchExchangeRate();
        const interval = setInterval(fetchExchangeRate, 3000); // Fetch exchange rate every 3 seconds
        return () => clearInterval(interval);
    }, [fromCurrency, toCurrency]);

    return (
        <View style={styles.item}>
            <Text style={styles.symbol}>{fromCurrency} to {toCurrency}:</Text>
            <Text style={styles.rate}>{parseFloat(rate).toFixed(4)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        width: '95%',
        backgroundColor: '#2f2f2f',
        padding: 25,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rate: {
        flex: 1,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right', // Align text to the right
    },
    symbol: {
        flex: 1,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default ExchangeRate;

