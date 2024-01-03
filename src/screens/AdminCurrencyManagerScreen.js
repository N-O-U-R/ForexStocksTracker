import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import axios from 'axios';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton, GestureHandlerRootView } from 'react-native-gesture-handler';
import ExchangeRate from '../components/ExchangeRate';

const AdminCurrencyManagerScreen = ({ navigation }) => {
    const [exchangeRates, setExchangeRates] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        fetchExchangeRates();
    }, []);

    const fetchExchangeRates = async () => {
        const querySnapshot = await getDocs(collection(db, "exchangeRates"));
        const rates = [];
        querySnapshot.forEach((doc) => {
            rates.push({ id: doc.id, ...doc.data() });
        });
        setExchangeRates(rates);
    };

    const searchCurrency = async (text) => {
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
                const currencyData = response.data?.data?.currency;
                if (currencyData && currencyData.length > 0) {
                    setSearchResults(currencyData.slice(0, 5));
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

    const handleSelectCurrency = async (currencyPair) => {
        await saveToFirestore(currencyPair.from_symbol, currencyPair.to_symbol);
        setSearchText('');
        setSearchResults([]);
    };

    const saveToFirestore = async (fromCurrency, toCurrency) => {
        await addDoc(collection(db, "exchangeRates"), { fromCurrency, toCurrency });
        fetchExchangeRates();
    };

    const handleDelete = (rateId) => {
        Alert.alert(
            "Delete Exchange Rate",
            "Are you sure you want to delete this rate?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => deleteRate(rateId) },
            ],
        );
    };

    const deleteRate = async (rateId) => {
        try {
            await deleteDoc(doc(db, "exchangeRates", rateId));
            fetchExchangeRates();  // Refresh the list after deletion
        } catch (error) {
            console.error('Delete Error:', error);
        }
    };

    const renderRightActions = (rateId) => {
        return (
            <RectButton style={styles.deleteButton} onPress={() => handleDelete(rateId)}>
                <Text style={styles.actionText}>Delete</Text>
            </RectButton>
        );
    };
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container} scrollEnabled={true}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search Currency (e.g., USD to EUR)"
                    value={searchText}
                    onChangeText={searchCurrency}
                    placeholderTextColor={'lightgray'}
                />
                {searchText && searchResults.length > 0 && (
                    <View style={styles.resultsContainer}>
                        {searchResults.map((result, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.resultItem}
                                onPress={() => handleSelectCurrency(result)}
                            >
                                <Text style={styles.resultText}>{`${result.from_symbol} to ${result.to_symbol}`}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                {exchangeRates.map((rate, index) => (
                    <Swipeable
                        key={rate.id}
                        renderRightActions={() => renderRightActions(rate.id)}
                        style={styles.swipeable}
                    >
                        <ExchangeRate
                            fromCurrency={rate.fromCurrency}
                            toCurrency={rate.toCurrency}
                            navigation={navigation}
                        />
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
    dropdown: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#1e1e1e',
        borderColor: 'lightgray',
    },
    dropdownContainer: {
        borderColor: 'lightgray',
    },
    dropdownItem: {
        backgroundColor: '#333',
    },
});

export default AdminCurrencyManagerScreen;