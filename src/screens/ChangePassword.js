import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity,Text } from 'react-native';
import { auth } from '../../firebase';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";

const ChangePasswordScreen = ({navigation}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
        );

        reauthenticateWithCredential(user, credential)
            .then(() => {
                updatePassword(user, newPassword)
                    .then(() => {
                        alert('Password updated successfully');
                        navigation.goBack();
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Current Password"
                placeholderTextColor="#fff" // Set placeholder text color to white
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor="#fff" // Set placeholder text color to white
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#fff" // Set placeholder text color to white
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.button} title="Change Password" onPress={handleChangePassword}><Text style={{color:'white', fontWeight:600}}>Change Password</Text></TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#1f1f1f',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 12,
        paddingHorizontal: 8,
        color: '#fff', // Set text color to white
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
});


export default ChangePasswordScreen;
