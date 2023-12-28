import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  if (auth.currentUser) {
    navigation.navigate("Tracker");
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Tracker");
      }
    });
  }

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.navigate('Home');
        })
        .catch((error) => {
          alert("Check your credentials again");
        });
      }
    else {
      alert("Please enter your credentials");
    }
  };
  

  const handleForgotPassword = () => {
    // Handle forgot password logic here
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress= {()=> navigation.navigate("SignUp") } >
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', // Added color property
  },
  input: {
    width: '100%',
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
    width: '100%',
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