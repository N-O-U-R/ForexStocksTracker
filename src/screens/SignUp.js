import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Text, TextInput, TouchableOpacity } from 'react-native';
import { auth, db } from '../../firebase'; // Ensure db is imported from your firebase config
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore'; // Import setDoc and doc

export default function SignUp({ navigation }) {
    let [email, setEmail] = React.useState("");
    let [password, setPassword] = React.useState("");
    let [confirmPassword, setConfirmPassword] = React.useState("");
    let [validationMessage, setValidationMessage] = React.useState("");

    let validateAndSet = (value, valueToCompare, setValue) => {
        if (value !== valueToCompare) {
            setValidationMessage("Passwords do not match.");
        } else {
            setValidationMessage("");
        }
    
        setValue(value);
    };

    let signUp = () => {
        if (password !== confirmPassword) {
            setValidationMessage("Passwords do not match.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Set the user's role in Firestore
                setDoc(doc(db, "users", userCredential.user.uid), {
                    role: "user",
                    email: email 
                });
                sendEmailVerification(auth.currentUser);
                navigation.navigate("Login", { user: userCredential });
            })
            .catch((error) => {
                setValidationMessage(error.message);
            });
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.title}>Sign Up</Text>
            <Text style={[styles.errorText]}>{validationMessage}</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={signUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress= {()=> navigation.navigate("Login") } >
                <Text style={styles.forgotPasswordText}>Already have an account?</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#1e1e1e',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        color: 'black',
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10,
    },
    errorText: {
        color: "#ff0000",
        paddingBottom: 15,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    forgotPasswordText: {
        color: 'white',
        textDecorationLine: 'underline',
    },
});
