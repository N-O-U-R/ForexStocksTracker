import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';


const AdminUserManagerScreen = ({ navigation }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            const userData = [];
            querySnapshot.forEach((doc) => {
                userData.push({ id: doc.id, ...doc.data() });
            });
            setUsers(userData);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    
    const handleDelete = (userId) => {
        Alert.alert(
            "Delete User",
            "Are you sure you want to delete this user?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => deleteUser(userId) },
            ],
        );
    };

    const deleteUser = async (userId) => {
        try {
          await deleteDoc(doc(db, "users", userId));
          fetchUsers();  // Refresh the list after deletion
        } catch (error) {
          console.error('Delete Error:', error);
          // Handle the error in the UI
        }
      };

    const renderRightActions = (userId) => {
        return (
            <RectButton style={styles.deleteButton} onPress={() => handleDelete(userId)}>
                <Text style={styles.actionText}>Delete</Text>
            </RectButton>
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                {users.map((user, index) => (
                    <Swipeable
                        key={user.id}
                        renderRightActions={() => renderRightActions(user.id)}
                    >
                        <View style={styles.userItem}>
                            <Text style={styles.userText}>{user.email}</Text>
                        </View>
                    </Swipeable>
                ))}
            </ScrollView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
    },
    userItem: {
        backgroundColor: '#333',
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    userText: {
        color: 'white',
        fontSize: 18,
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        borderRadius: 10,
        height: 50,
        alignSelf: 'center',
    },
    actionText: {
        color: 'white',
        fontWeight: '600',
        padding: 20,
    },
});

export default AdminUserManagerScreen;
