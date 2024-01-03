// notifications.js
import * as Notifications from 'expo-notifications';

export const sendNotification = async (token, message) => {
  await Notifications.scheduleNotificationAsync({
    content: { title: "Exchange Rate Alert", body: message },
    trigger: { seconds: 1 }, // Send immediately
  });
};
