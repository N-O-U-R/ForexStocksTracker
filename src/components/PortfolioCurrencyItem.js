import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const PortfolioCurrencyItem = ({ id, fromCurrency, toCurrency, amount, purchaseRate, navigation }) => {
    const [currentRate, setCurrentRate] = useState(0);
    const [isProfit, setIsProfit] = useState(true);

    const fetchCurrentRate = async () => {
        try {
            const response = await axios.get('https://real-time-finance-data.p.rapidapi.com/currency-exchange-rate', {
                params: {
                    from_symbol: fromCurrency,
                    to_symbol: toCurrency,
                    language: 'en'
                },
                headers: {
                    'X-RapidAPI-Key': '63aa7ba31bmsh9c191c8515a306bp101640jsn83bb70cda994',
                    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
                }
            });
            const rate = response.data['data']['exchange_rate'];
            setCurrentRate(rate);
            setIsProfit(rate >= purchaseRate);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCurrentRate();
        const interval = setInterval(fetchCurrentRate, 60000); // 60 seconds interval
        return () => clearInterval(interval);
    }, [fromCurrency, toCurrency]);

    const rateStyle = isProfit ? styles.profit : styles.loss;

    return (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('CurrencyItemDetails', { id, fromCurrency, toCurrency, amount, purchaseRate })}>
            <Text style={styles.name}>{fromCurrency} to {toCurrency}</Text>
            <Text style={[styles.rate, rateStyle]}>{(currentRate * amount).toFixed(4)}</Text>
            <Text style={styles.toCurrency}>{toCurrency}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        width: '100%',
        backgroundColor: '#2f2f2f',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        color: '#fff',
        flex: 1,
    },
    rate: {
        fontSize: 18,
        textAlign: 'right',
        paddingRight: 2,
    },
    profit: {
        color: 'green',
    },
    loss: {
        color: 'red',
    },
    toCurrency: {
        fontSize: 9,
        color: '#fff',
        textAlign: 'right',
        paddingBottom: 5,
     },
});

export default PortfolioCurrencyItem;
