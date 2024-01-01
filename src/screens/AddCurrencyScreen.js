import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../../firebase';
import { collection, addDoc } from "firebase/firestore";

const AddCurrencyScreen = ({ route, navigation }) => {
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [rate, setRate] = useState(0);
    const [investmentAmount, setInvestmentAmount] = useState(0);

    useEffect(() => {
        if (route.params?.fromCurrency && route.params?.toCurrency && route.params?.rate) {
            setFromCurrency(route.params.fromCurrency);
            setToCurrency(route.params.toCurrency);
            setRate(route.params.rate);
        }
    }, [route.params]);

    const handleAdd = async () => {
        if (auth.currentUser) {
            await addDoc(collection(db, "users", auth.currentUser.uid, "portfolio"), {
                fromCurrency: fromCurrency,
                toCurrency: toCurrency,
                rate: Number(rate),
                amount: Number(investmentAmount),
                type: 'currency'
            });
            navigation.navigate("Portfolio");
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.text}>{fromCurrency} to {toCurrency}</Text>
            <Text style={styles.text}>Price: ${rate}</Text>
            <TextInput
                placeholder="Investment Amount"
                value={investmentAmount}
                onChangeText={setInvestmentAmount}
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor={'#777'}
                type="number"
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={handleAdd}>
                <Text style={styles.buttonText}>Add Investment</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView >
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
    text: {
        width: '95%',
        color: '#fff',
        marginBottom: 10,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 7,
    },
    input: {
        width: '95%',
        backgroundColor: '#2f2f2f',
        color: '#fff',
        borderRadius: 8,
        padding: 15,
        marginVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '95%',
        backgroundColor: '#3b3b3b',
        borderRadius: 8,
        padding: 15,
        marginTop: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddCurrencyScreen;
