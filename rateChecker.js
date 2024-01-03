import { db, auth } from './firebase'; // Adjust the path as necessary
import { sendNotification } from './notifications'; // Adjust the path as necessary
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import axios from 'axios';

export const checkRatesAndNotify = async () => {
    
    const currentUser = auth.currentUser;
    if (!currentUser) {
        console.log('No authenticated user found.');
        return false;
    }
    const userId = currentUser.uid;

    // Now pass this userId to getFirestoreUserDataWithAlarms
    const usersData = await getFirestoreUserDataWithAlarms(userId);
    for (const user of usersData) {
        for (const alarm of user.alarms) {
            const currentRate = await fetchCurrentExchangeRate(alarm.fromCurrency, alarm.toCurrency);
            if (alarm.targetRate <= currentRate) {
              console.log('Target rate reached!');
                await sendNotification(user.notificationToken, `Target rate for ${alarm.fromCurrency} to ${alarm.toCurrency} reached!`);
                console.log(user.notificationToken);
                console.log(`Target rate for ${alarm.fromCurrency} to ${alarm.toCurrency} reached!`);
            }
        }
    }

    return true;
};


const getFirestoreUserDataWithAlarms = async (userId) => {

  try {
      const userRef = doc(db, 'users', userId);
      const userData = (await getDoc(userRef)).data();

      if (!userData) {
          console.error('User data not found for userId:', userId);
          return [];
      }

      const alarmsSnapshot = await getDocs(collection(db, `users/${userId}/alarms`));
      userData.alarms = alarmsSnapshot.docs.map(alarmDoc => alarmDoc.data());

      return [userData]; // Return an array containing only this user's data
  } catch (error) {
      console.error('Error in getFirestoreUserDataWithAlarms:', error);
      return [];
  }
};



const fetchCurrentExchangeRate = async (fromCurrency, toCurrency) => {
    try {
        const response = await axios({
            method: "GET",
            url: "https://real-time-finance-data.p.rapidapi.com/currency-time-series",
            params: { from_symbol: fromCurrency, to_symbol: toCurrency, period: "1D", language: "en" },
            headers: {
                "X-RapidAPI-Key": "3704aa17efmshc150cc51bc29685p1a8535jsndc6c4d2dc793", // Replace with your actual API key
                "X-RapidAPI-Host": "real-time-finance-data.p.rapidapi.com"
            }
        });
        return response.data.data.exchange_rate;
    } catch (error) {
        console.error("Error fetching currency rate:", error);
        return null;
    }
};
