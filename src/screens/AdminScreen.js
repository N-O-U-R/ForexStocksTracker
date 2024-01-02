import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const AdminScreen = ({ navigation }) => {

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigation.replace('Login');  // Redirect to Login screen after logout
            })
            .catch((error) => {
                console.error('Logout Error:', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Dashboard</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdminCurrencyManager')}>
                <Text style={styles.buttonText}>Manage Currencies</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdminStockManager')}>
                <Text style={styles.buttonText}>Manage Stocks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdminUserManager')}>
                <Text style={styles.buttonText}>Manage Users</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{backgroundColor:'#c10'}]} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
paddingBottom: 15,
    },
    button: {
        width: '85%',
        height: 50,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20, // Added margin for spacing between buttons
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default AdminScreen;
