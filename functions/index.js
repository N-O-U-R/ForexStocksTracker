const functions = require("../firebase-functions");
const admin = require("../firebase-admin");
const axios = require("axios");
admin.initializeApp();

const db = admin.firestore();
const {doc, getDoc, collection, getDocs} = require("firebase-admin/firestore");

const fetchCurrentExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    const apiUrl = "https://real-time-finance-data.p.rapidapi.com/" +
               "currency-exchange-rate";
    const response = await axios({
      method: "GET",
      url: apiUrl,
      params: {from_symbol: fromCurrency,
        to_symbol: toCurrency, language: "en"},
      headers: {
        "X-RapidAPI-Key": "3704aa17efmshc150cc51bc29685p1a8535jsndc6c4d2dc793",
        "X-RapidAPI-Host": "real-time-finance-data.p.rapidapi.com",
      },
    });
    return response.data.data.exchange_rate;
  } catch (error) {
    console.error("Error fetching currency rate:", error);
    return null;
  }
};

const getFirestoreUserDataWithAlarms = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userData = (await getDoc(userRef)).data();
    if (!userData) {
      console.error("User data not found for userId:", userId);
      return [];
    }

    const alarmsPath = `users/${userId}/alarms`;
    const alarmsSnapshot = await getDocs(collection(db, alarmsPath));
    userData.alarms = alarmsSnapshot.docs.map((doc) => doc.data());
    return [userData];
  } catch (error) {
    console.error("Error in getFirestoreUserDataWithAlarms:", error);
    return [];
  }
};

const sendNotificationViaFCM = async (token, message) => {
  const messagePayload = {
    notification: {title: "Exchange Rate Alert", body: message},
    token: token,
  };

  try {
    await admin.messaging().send(messagePayload);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

module.exports.checkRatesAndNotify =
 functions.pubsub.schedule("every 5 minutes")
     .onRun(async (context) => {
       const usersRef = db.collection("users");
       const usersSnapshot = await usersRef.get();

       for (const userDoc of usersSnapshot.docs) {
         const userId = userDoc.id;
         const usersData = await getFirestoreUserDataWithAlarms(userId);

         for (const user of usersData) {
           if (user.alarms && user.notificationToken) {
             for (const alarm of user.alarms) {
               const currentRate = await fetchCurrentExchangeRate(
                   alarm.fromCurrency,
                   alarm.toCurrency,
               );
               const targetRateReached = alarm.targetRate <= currentRate;
               if (targetRateReached) {
                 const notificationMessage =
                 `Target rate for ${alarm.fromCurrency} to ` +
                                          `${alarm.toCurrency} reached!`;
                 await sendNotificationViaFCM(user.notificationToken,
                     notificationMessage);
                 console.log("Target rate reached for user:", userId);
               }
             }
           }
         }
       }
     });
