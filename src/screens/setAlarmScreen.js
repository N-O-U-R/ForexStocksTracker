import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../../firebase';
import { collection, addDoc } from "firebase/firestore";

const SetAlarmScreen = ({ route, navigation }) => {
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [currentRate, setCurrentRate] = useState(0);
    const [targetRate, setTargetRate] = useState('');

    // Initialize the state with data passed from the previous screen
    useState(() => {
        if (route.params?.fromCurrency && route.params?.toCurrency && route.params?.currentRate) {
            setFromCurrency(route.params.fromCurrency);
            setToCurrency(route.params.toCurrency);
            setCurrentRate(route.params.currentRate);
        }
    }, [route.params]);

    // Handle setting the alarm
    const handleSetAlarm = async () => {
        if (auth.currentUser) {
            await addDoc(collection(db, "users", auth.currentUser.uid, "alarms"), {
                fromCurrency: fromCurrency,
                toCurrency: toCurrency,
                targetRate: Number(targetRate),
                createdAt: new Date()
            });
            navigation.navigate("Alarms"); // Navigate back to the previous screen
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.text}>{fromCurrency} to {toCurrency}</Text>
            <Text style={styles.text}>Current Rate: {parseFloat(currentRate).toFixed(4)}</Text>
            <TextInput
                placeholder="Target Rate"
                value={targetRate}
                onChangeText={(text) => setTargetRate(text.replace(',', '.'))}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor={'#777'}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={handleSetAlarm}>
                <Text style={styles.buttonText}>Set Alarm</Text>
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

export default SetAlarmScreen;
