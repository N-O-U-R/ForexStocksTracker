import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { db, auth } from '../../firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import axios from 'axios';

const CurrencyItemDetails = ({ route, navigation }) => {
    const { id, fromCurrency, toCurrency, amount, purchaseRate } = route.params;
    const [currentRate, setCurrentRate] = useState(0);
    const [newAmount, setNewAmount] = useState(amount);

    const fetchCurrentRate = async () => {
        try {
            const response = await axios.get('https://real-time-finance-data.p.rapidapi.com/currency-exchange-rate', {
                params: {
                    from_symbol: fromCurrency,
                    to_symbol: toCurrency,
                    language: 'en'
                },
                headers: {
                    'X-RapidAPI-Key': '3704aa17efmshc150cc51bc29685p1a8535jsndc6c4d2dc793',
                    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
                }
            });
            const rate = response.data['data']['exchange_rate'];
            setCurrentRate(rate);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchCurrentRate();
    }, [fromCurrency, toCurrency]);

    const handleUpdate = async () => {
        if (auth.currentUser) {
            const docRef = doc(db, "users", auth.currentUser.uid, "portfolio", id);
            try {
                await updateDoc(docRef, {
                    amount: Number(newAmount)
                });
                Alert.alert("Update Successful", "The amount has been updated.");
                navigation.goBack();
            } catch (error) {
                console.error("Error updating document: ", error);
                Alert.alert("Update Failed", "There was a problem updating the amount.");
            }
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Delete Investment",
            "Are you sure you want to delete this investment?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    onPress: async () => {
                        if (auth.currentUser && id) {
                            const docRef = doc(db, "users", auth.currentUser.uid, "portfolio", id);
                            try {
                                await deleteDoc(docRef);
                                Alert.alert("Delete Successful", "The investment has been deleted.");
                                navigation.goBack();
                            } catch (error) {
                                console.error("Error deleting document: ", error);
                                Alert.alert("Delete Failed", "There was a problem deleting the investment.");
                            }
                        }
                    }
                },
            ]
        );
    };


    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <Text style={styles.header}>{fromCurrency} to {toCurrency}</Text>
            <View style={styles.row}>
                <Text style={styles.title}>Current Rate:</Text>
                <Text style={styles.value}>${currentRate}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>Purchased Rate:</Text>
                <Text style={styles.value}>${purchaseRate}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>Amount:</Text>
                <Text style={styles.value}>{amount}</Text>
            </View>
            <TextInput
                type='number'
                style={styles.input}
                value={newAmount}
                onChangeText={(text) => setNewAmount(text)}
                keyboardType="numeric"
                placeholder='Enter new amount'
                placeholderTextColor={'#aaa'}
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update Amount</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.buttonText}>Delete Investment</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
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

export default CurrencyItemDetails;