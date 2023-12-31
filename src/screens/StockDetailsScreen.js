import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import moment from 'moment';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const StockDetailsScreen = ({ route, navigation }) => {
    const { symbol, name } = route.params;
    const [period, setPeriod] = useState('1D');
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState(0);

    const fetchData = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: 'https://real-time-finance-data.p.rapidapi.com/stock-time-series',
                params: {
                    symbol: symbol,
                    period,
                    language: 'en'
                },
                headers: {
                    'X-RapidAPI-Key': '3704aa17efmshc150cc51bc29685p1a8535jsndc6c4d2dc793',
                    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
                }
            });
            const timeSeries = response.data.data.time_series;
            const chartLabels = Object.keys(timeSeries);
            const chartValues = chartLabels.map(time => timeSeries[time].price);
            let formattedLabels;
            if (period === '1D') {
                // Format for 1D - showing 4 labels throughout the day
                const interval = Math.ceil(chartLabels.length / 4); // Calculate interval for 4 labels
                formattedLabels = chartLabels.filter((_, index) => {
                    return index % interval === 0; // Pick labels at calculated intervals
                }).map(label => moment(label).format('HH:mm')); // Format as hours and minutes
            } else {
                const interval = Math.ceil(chartLabels.length / 4);
                formattedLabels = chartLabels.filter((_, index) => {
                    return index % interval === 0;
                }).map(label => moment(label).format('YYYY-MM-DD'));
            }

            setChartData({
                labels: formattedLabels,
                datasets: [{ data: chartValues }]
            });
            setPrice(response.data.data.price);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [period, symbol]);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{name} {symbol}</Text>
            <Text style={styles.headerText}>Price: ${price}</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('AddInvestment', { investmentName: name, investmentPrice: price, investmentSymbol: symbol })}
                style={styles.button}>
                <Text style={{
                    color: '#fff', fontSize: 16,
                    fontWeight: 'bold',
                }}>Add Investment</Text>
            </TouchableOpacity>
            <RNPickerSelect
                onValueChange={(value) => {
                    setPeriod(value);
                    setLoading(true);
                }}
                items={[
                    { label: '1 Day', value: '1D' },
                    { label: '5 Days', value: '5D' },
                    { label: '1 Months', value: '1M' },
                    { label: '6 Months', value: '6M' },
                    { label: 'Year To Date', value: 'YTD' },
                    { label: '1 Year', value: '1Y' },
                    { label: '5 Year', value: '5Y' },
                    { label: 'All Times', value: 'MAX' },
                ]}
                placeholder={{ label: "Select a period", value: null }}
                style={styles}
            />
            {loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                <ActivityIndicator size="large" color="#FFFFFF" />
            </View> :
                <LineChart
                    data={{
                        ...chartData,
                    }}
                    width={screenWidth}
                    height={screenHeight / 2}
                    style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}
                    chartConfig={{
                        backgroundColor: '#000000',  // Black background
                        backgroundGradientFrom: '#232323',  // Dark gray gradient start
                        backgroundGradientTo: '#3f3f3f',  // Light gray gradient end
                        decimalPlaces: 2,  // 2 decimal places for rate
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,  // White text color
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,  // White label color
                        strokeWidth: 4,  // Set line thickness to 0 to hide data lines
                        propsForDots: {
                            r: "0",  // Setting radius to 0 will hide the dots
                        },
                        propsForBackgroundLines: {
                            strokeWidth: 0.3,  // Set grid line thickness to 0 to hide grids
                        },
                    }}
                    bezier
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1f1f1f'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff'
    },
    picker: {
        width: 150,
        height: 50,
        color: '#fff',
    },
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginTop: 20,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginTop: 20,
    },
    button: {
        width: '80%',
        backgroundColor: '#3b3b3b',
        borderRadius: 8,
        padding: 15,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center', // Added property to center the button
    },
});

export default StockDetailsScreen;
