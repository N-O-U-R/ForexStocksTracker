import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Ensure this points to your Firebase configuration
import StockQuote from '../components/StockQuote';

const StockQuoteScreen = ({ navigation }) => {
    const [stockQuotes, setStockQuotes] = useState([]);

    useEffect(() => {
        const fetchStockQuotes = async () => {
            const querySnapshot = await getDocs(collection(db, "stockQuotes")); // Replace "stockQuotes" with your collection name
            const quotes = [];
            querySnapshot.forEach((doc) => {
                quotes.push(doc.data());
            });
            setStockQuotes(quotes);
        };

        fetchStockQuotes();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {stockQuotes.map((quote, index) => (
                <StockQuote
                    key={index}
                    symbol={quote.symbol}
                    name={quote.name}
                    navigation={navigation}
                />
            ))}
        </ScrollView>   
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
    },
});

export default StockQuoteScreen;
