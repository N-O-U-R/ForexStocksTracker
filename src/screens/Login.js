import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Text, TextInput, TouchableOpacity,Platform } from 'react-native';
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && !navigation.isFocused()) {
                navigateBasedOnRole(user.uid);
            }
        });

        return unsubscribe;  
    }, [navigation]);

    const navigateBasedOnRole = async (uid) => {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().role === 'admin') {
            navigation.navigate("Admin"); 
        } else {
            navigation.navigate("Tracker"); 
        }
    };

    const handleLogin = () => {
        if (email === "" || password === "") {
            alert("Please enter your credentials");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigateBasedOnRole(userCredential.user.uid);
            })
            .catch(() => {
                alert("Check your credentials again");
            });
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <Text style={styles.title}>Login</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.forgotPasswordText}>Don't have an account?</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', // Added color property
  },
  input: {
    width: '95%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white', // Added backgroundColor property
    color: 'black', // Added color property
  },
  button: {
    width: '95%',
    height: 40,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
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

export default Login;