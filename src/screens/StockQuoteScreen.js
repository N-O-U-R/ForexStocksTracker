import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import StockQuote from '../components/StockQuote'; 

const StockQuoteScreen = ({navigation}) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StockQuote symbol="MSFT" name="Microsoft" navigation={navigation}/>
            <StockQuote symbol="VTSAX" name="Vanguard" navigation={navigation}/>
            <StockQuote symbol="AAPL:NASDAQ" name="Apple" navigation={navigation}/>
            <StockQuote symbol="APC:ETR" name="Apple" navigation={navigation}/>
        </ScrollView>   
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
    },
    item: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
    }
});

export default StockQuoteScreen;
