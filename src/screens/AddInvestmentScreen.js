import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';
import { db, auth } from '../../firebase';
import { collection, addDoc } from "firebase/firestore";

const AddInvestmentScreen = ({ route, navigation }) => {
  const [investmentName, setInvestmentName] = useState('');
  const [investmentValue, setInvestmentValue] = useState(0);
  const [investmentPrice, setInvestmentPrice] = useState(0);
  const [investmentSymbol, setInvestmentSymbol] = useState('');
  useEffect(() => {
    if (route.params?.investmentName && route.params?.investmentPrice && route.params?.investmentSymbol) {
      setInvestmentName(route.params.investmentName);
      setInvestmentPrice(route.params.investmentPrice);
      setInvestmentSymbol(route.params.investmentSymbol);
    }
  }, [route.params]);

  const handleAdd = async () => {
    if (auth.currentUser) {
      await addDoc(collection(db, "users", auth.currentUser.uid, "portfolio"), {
        name: investmentName,
        value: Number(investmentValue),
        price: Number(investmentPrice),
        symbol: investmentSymbol,
        type: 'stock'
      });
      navigation.navigate("Portfolio");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.text}>{investmentName} {investmentSymbol}</Text>
      <Text style={styles.text}>Price: ${investmentPrice}</Text>
      <TextInput
        placeholder="Investment Shares"
        value={investmentValue}
        onChangeText={setInvestmentValue}
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

export default AddInvestmentScreen;
