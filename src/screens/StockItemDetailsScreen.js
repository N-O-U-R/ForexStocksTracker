import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase'; // Adjust the path to your firebase configuration
import axios from 'axios';

const StockItemDetails = ({ route, navigation }) => {
    const { id, name, symbol, shares, purchasePrice } = route.params;
    const [currentPrice, setCurrentPrice] = useState(0);
    const [newValue, setNewValue] = useState(shares);

    const fetchCurrentPrice = async () => {
        try {
            const response = await axios.get('https://real-time-finance-data.p.rapidapi.com/stock-quote', {
                params: {
                    symbol: symbol,
                    language: 'en'
                },
                headers: {
                    'X-RapidAPI-Key': '63aa7ba31bmsh9c191c8515a306bp101640jsn83bb70cda994',
                    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
                }
            });
            const price = response.data['data']['price'];
            setCurrentPrice(price); // Modify based on your API response
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCurrentPrice();
    }, [symbol]);

    const handleUpdate = async () => {
        if (auth.currentUser) {
            const docRef = doc(db, "users", auth.currentUser.uid, "portfolio", id);
            try {
                await updateDoc(docRef, {
                    value: Number(newValue)
                });
                Alert.alert("Update Successful", "The amount has been updated.");
                navigation.goBack();
            } catch (error) {
                console.error("Error updating document: ", error);
                Alert.alert("Update Failed", "There was a problem updating the amount.");
            }
        }
    };

    const handleDelete = async () => {
        if (auth.currentUser) {
            const docRef = doc(db, "users", auth.currentUser.uid, "portfolio", id);
            try {
                await deleteDoc(docRef);
                Alert.alert("Delete Successful", "The stock item has been deleted.");
                navigation.goBack();
            } catch (error) {
                console.error("Error deleting document: ", error);
                Alert.alert("Delete Failed", "There was a problem deleting the stock item.");
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{name} ({symbol})</Text>
            <View style={styles.row}>
                <Text style={styles.title}>Current Price:</Text>
                <Text style={styles.value}>${currentPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>Purchased Price:</Text>
                <Text style={styles.value}>${purchasePrice}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>Shares:</Text>
                <Text style={styles.value}>{shares}</Text>
            </View>
            <TextInput
                style={styles.input}
                value={newValue}
                onChangeText={(text) => setNewValue(text)}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update Shares</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.buttonText}>Delete Stock</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    title: {
        color: '#aaa',
        fontSize: 16,
    },
    value: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        backgroundColor: '#2f2f2f',
        color: '#fff',
        borderRadius: 5,
        padding: 15,
        fontSize: 16,
        marginVertical: 10,
    },
    button: {
        width: '100%',
        backgroundColor: '#3b3b3b',
        borderRadius: 5,
        padding: 15,
        marginTop: 10,
        alignItems: 'center',
    },
    deleteButton: {
        width: '100%',
        backgroundColor: 'red',
        borderRadius: 5,
        padding: 15,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default StockItemDetails;
