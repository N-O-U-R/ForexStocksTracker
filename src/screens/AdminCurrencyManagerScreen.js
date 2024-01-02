import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

const ExchangeRatesScreen = ({ navigation }) => {
    const [exchangeRates, setExchangeRates] = useState([]);

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
        await deleteDoc(doc(db, "exchangeRates", rateId));
        fetchExchangeRates();  // Refresh the list after deletion
    };

    const renderRightActions = (rateId) => {
        return (
            <RectButton style={styles.deleteButton} onPress={() => handleDelete(rateId)}>
                <Text style={styles.actionText}>Delete</Text>
            </RectButton>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {exchangeRates.map((rate, index) => (
                <Swipeable
                    key={rate.id}
                    renderRightActions={() => renderRightActions(rate.id)}
                >
                    <ExchangeRate
                        fromCurrency={rate.fromCurrency}
                        toCurrency={rate.toCurrency}
                        navigation={navigation}
                    />
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
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: 80,
        height: '100%',
    },
    actionText: {
        color: 'white',
        fontWeight: '600',
        padding: 20,
    },
});

export default ExchangeRatesScreen;
