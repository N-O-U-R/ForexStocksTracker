import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const StockQuote = ({ symbol, name, navigation }) => {
    const [price, setPrice] = useState(0);

    const fetchExchangeRate = async () => {
        try {
            const response = await axios.get('https://real-time-finance-data.p.rapidapi.com/stock-quote', {
                params: {
                    symbol: symbol,
                    language: 'en'
                },
                headers: {
                    'X-RapidAPI-Key': '5d3583f4famsh01f25c37433d0e2p19867djsn30a03333a34d',
                    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
                }
            });
            setPrice(response.data['data']['price']);
        } catch (error) {
            console.error(error);
        }
    };
    const handlePress = () => {
        navigation.navigate('StockDetails', { symbol,name });
    };


    useEffect(() => {
        fetchExchangeRate();
        const interval = setInterval(fetchExchangeRate, 120000); 
        return () => clearInterval(interval);
    }, [symbol]);

    return (
        <TouchableOpacity style={styles.item} onPress={handlePress}>
            <View style={styles.nameSymbolContainer}>
                <Text style={styles.symbol}>{name}</Text>
                <Text style={styles.name}>{symbol}</Text>
            </View>
            <Text style={styles.price}>{price}</Text>
        </TouchableOpacity>
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
        alignItems: 'center',
    },
    price: {
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
        paddingBottom: 7,
    },
    name: {
        flex: 1,
        color: '#ccc',
        fontSize: 12,
        fontWeight: 'bold',
    },
    nameSymbolContainer: {
        height: 40,
        justifyContent: 'center',
        flexDirection: 'column',
    },
});

export default StockQuote;

