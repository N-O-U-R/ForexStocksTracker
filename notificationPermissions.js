import * as Notifications from 'expo-notifications';
import { db, auth } from './firebase'; // Ensure this import is correct
import { doc, updateDoc } from "firebase/firestore";

export const requestNotificationPermission = async (userId) => {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status === 'granted') {
    const token = (await Notifications.getExpoPushTokenAsync({
      projectId: '82784eab-ab8f-4f96-b450-4944b710ead1',
    })).data;
    
    // Store this token in Firestore against the user's document
    const userDocRef = doc(db, 'users', userId); // Reference to the user's document
    await updateDoc(userDocRef, { notificationToken: token });
    console.log("Notification permissions granted.");
  } else {
    // Handle denial of notification permission
    console.log("Notification permissions denied.");
  }
};
