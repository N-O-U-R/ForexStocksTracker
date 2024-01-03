import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const PortfolioStockItem = ({ id, name,symbol, shares, purchasePrice, navigation }) => {
    const [currentPrice, setCurrentPrice] = useState(0);
    const [isProfit, setIsProfit] = useState(true);

    const fetchCurrentPrice = async () => {
        try {
            // Replace with your API endpoint and parameters
            const response = await axios.get('https://real-time-finance-data.p.rapidapi.com/stock-quote', {
                params: {
                    symbol: symbol,
                    language: 'en'
                },
                headers: {
                    'X-RapidAPI-Key': '3704aa17efmshc150cc51bc29685p1a8535jsndc6c4d2dc793',
                    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
                }
            });
            price = response.data['data']['price']; // Modify according to your API response structure
            setCurrentPrice(price);
            setIsProfit(price * shares >= purchasePrice * shares);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCurrentPrice();
        const interval = setInterval(fetchCurrentPrice, 60000);
        return () => clearInterval(interval);
    }, [symbol]);

    const priceStyle = isProfit ? styles.profit : styles.loss;

    return (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('StockItemDetails', { id, name, symbol, shares, purchasePrice })}
        >
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.symbol}>{symbol}</Text>
            </View>
            <Text style={[styles.price, priceStyle]}>${currentPrice * shares}</Text>
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
      flex: 1, // Adjust as needed to fit the layout
    },
    symbol: {
      fontSize: 14,
      color: '#ccc',
      flex: 1, // Adjust as needed to fit the layout
    },
    price: {
      fontSize: 18,
      textAlign: 'right',
      paddingRight: 15,
      // We will dynamically change the color in the component
    },
    profit: {
      color: 'green',
    },
    loss: {
      color: 'red',
    },
    nameContainer: {
      height: 40,
      justifyContent: 'center',
      flexDirection: 'column',
    }  
});

export default PortfolioStockItem;

