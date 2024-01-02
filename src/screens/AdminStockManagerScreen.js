import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Ensure this points to your Firebase configuration
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import StockQuote from '../components/StockQuote';

const StockQuoteScreen = ({ navigation }) => {
    const [stockQuotes, setStockQuotes] = useState([]);

    useEffect(() => {
        fetchStockQuotes();
    }, []);

    const fetchStockQuotes = async () => {
        const querySnapshot = await getDocs(collection(db, "stockQuotes"));
        const quotes = [];
        querySnapshot.forEach((doc) => {
            quotes.push({ id: doc.id, ...doc.data() });
        });
        setStockQuotes(quotes);
    };

    const handleDelete = (quoteId) => {
        Alert.alert(
            "Delete Stock",
            "Are you sure you want to delete this stock?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => deleteStock(quoteId) },
            ],
        );
    };

    const deleteStock = async (quoteId) => {
        await deleteDoc(doc(db, "stockQuotes", quoteId));
        fetchStockQuotes();  // Refresh the list after deletion
    };

    const renderRightActions = (quoteId) => {
        return (
            <RectButton style={styles.deleteButton} onPress={() => handleDelete(quoteId)}>
                <Text style={styles.actionText}>Delete</Text>
            </RectButton>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {stockQuotes.map((quote) => (
                <Swipeable
                    key={quote.id}
                    renderRightActions={() => renderRightActions(quote.id)}
                >
                    <View style={styles.stockItem}>
                        <StockQuote
                            symbol={quote.symbol}
                            name={quote.name}
                            navigation={navigation}
                        />
                    </View>
                </Swipeable>
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
    stockItem: {
        backgroundColor: '#333',
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: 80,
        borderRadius: 10,
    },
    actionText: {
        color: 'white',
        fontWeight: '600',
        padding: 20,
    },
});

export default StockQuoteScreen;
