import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { auth } from '../../firebase';
import { signOut } from "firebase/auth";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePassword from './ChangePassword';
const ProfileScreen = ({navigation}) => {

  let [errorMessage, setErrorMessage] = React.useState("");
  let [newPassword, setNewPassword] = React.useState("");
  let [currentPassword, setCurrentPassword] = React.useState("");

  let logout = () => {
    signOut(auth).then(() => {
      navigation.popToTop();
    });
  }

  const Stack = createNativeStackNavigator();


  return (
    
    <View style={globalStyles.container}>
      <Text style={styles.userInfo}>Email: {auth.currentUser.email}</Text>
      <Button title="Change Password" onPress={() => navigation.navigate("ChangePassword")} />
      <Button title="Log Out" onPress={() => {logout()}} color="#d9534f" />
    </View>
    
  );
};

const styles = StyleSheet.create({
  userInfo: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
});

export default ProfileScreen;
