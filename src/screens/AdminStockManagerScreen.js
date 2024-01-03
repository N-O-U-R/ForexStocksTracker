import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert, TouchableOpacity, TextInput } from 'react-native';
import { collection, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import axios from 'axios';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton, GestureHandlerRootView } from 'react-native-gesture-handler';
import StockQuote from '../components/StockQuote';

const AdminStockManagerScreen = ({ navigation }) => {
    const [stockQuotes, setStockQuotes] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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

    const searchStocks = async (text) => {
        setSearchText(text);
        if (text.length > 2) {
            try {
                const response = await axios.request({
                    method: 'GET',
                    url: 'https://real-time-finance-data.p.rapidapi.com/search',
                    params: { query: text, language: 'en' },
                    headers: {
                        'X-RapidAPI-Key': 'c0aa4cbc5amsh1b56d8a86031281p104771jsn86c95b1d0727',
                        'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
                    }
                });
                const stockData = response.data?.data?.stock;
                if (stockData && stockData.length > 0) {
                    setSearchResults(stockData.slice(0, 5));
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error(error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleSelectStock = async (stock) => {
        try {
            await addDoc(collection(db, "stockQuotes"), {
                symbol: stock.symbol,
                name: stock.name
            });
            fetchStockQuotes();
            setSearchText('');
            setSearchResults([]);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleDelete = (quoteId) => {
        Alert.alert(
            "Delete Stock Quote",
            "Are you sure you want to delete this stock quote?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => deleteStockQuote(quoteId) },
            ],
        );
    };

    const deleteStockQuote = async (quoteId) => {
        await deleteDoc(doc(db, "stockQuotes", quoteId));
        fetchStockQuotes();  // Refresh the list after deletion
    };

    const renderRightActions = (quoteId) => (
        <RectButton style={styles.deleteButton} onPress={() => handleDelete(quoteId)}>
            <Text style={styles.actionText}>Delete</Text>
        </RectButton>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search Stock (e.g., Apple)"
                    value={searchText}
                    onChangeText={searchStocks}
                    placeholderTextColor={'lightgray'}
                />
                {searchText && searchResults.length > 0 && (
                    <View style={styles.resultsContainer}>
                        {searchResults.map((result, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.resultItem}
                                onPress={() => handleSelectStock(result)}
                            >
                                <Text style={styles.resultText}>{`${result.name} ('${result.symbol}')`}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                {stockQuotes.map((quote, index) => (
                    <Swipeable
                        key={quote.id}
                        renderRightActions={() => renderRightActions(quote.id)}
                    >
                        <View>
                            <StockQuote
                                symbol={quote.symbol}
                                name={quote.name}
                                navigation={navigation}
                            />
                        </View>
                    </Swipeable>
                ))}
            </ScrollView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#1e1e1e',
        alignItems: 'stretch', 
    },
    swipeable: {
        width: '90%', 
    },
    searchBar: {
        width: '90%',
        height: 40,
        margin: 10,
        borderWidth: 2,
        padding: 10,
        color: 'white',
        borderColor: 'lightgray',
        borderRadius: 5,
        alignSelf: 'center',
    },
    resultsContainer: {
        width: '90%',
        backgroundColor: '#2f2f2f',
        position: 'absolute',
        top: 60,
        zIndex: 1000,
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
    },
    resultItem: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#1e1e1e',
        borderRadius: 10,
    },
    resultText: {
        color: 'lightgray',
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        borderRadius: 10,
        height: 65,
        alignSelf: 'center',
    },
    actionText: {
        color: 'white',
        fontWeight: '600',
        padding: 20,
    },
});

export default AdminStockManagerScreen;