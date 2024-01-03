const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

/**
 * Function to get the current currency rate
 * @param {string} fromCurrency - The currency to convert from
 * @param {string} toCurrency - The currency to convert to
 * @returns {Promise<number|null>} The current rate or null in case of an error
 */
async function getCurrentRate(fromCurrency, toCurrency) {
    try {
        const response = await axios({
            method: "GET",
            url: "https://real-time-finance-data.p.rapidapi.com/currency-time-series",
            params: { from_symbol: fromCurrency, to_symbol: toCurrency, period: "1D", language: "en" },
            headers: {
                "X-RapidAPI-Key": "3704aa17efmshc150cc51bc29685p1a8535jsndc6c4d2dc793",
                "X-RapidAPI-Host": "real-time-finance-data.p.rapidapi.com"
            }
        });
        return response.data.data.exchange_rate;
    } catch (error) {
        console.error("Error fetching currency rate:", error);
        return null;
    }
}

/**
 * Function to send a notification
 * @param {string} token - The FCM token of the user
 * @param {string} title - Title of the notification
 * @param {string} body - Body of the notification
 */
async function sendNotification(token, title, body) {
    const message = {
        notification: { title, body },
        token: token,
    };
    try {
        await admin.messaging().send(message);
        console.log("Notification sent successfully");
    } catch (error) {
        console.error("Error sending notification:", error);
    }
}

/**
 * Scheduled function to check currency rates and send notifications
 */
exports.checkCurrencyRates = functions.pubsub.schedule("every 5 minutes").onRun(async (context) => {
    const usersSnapshot = await admin.firestore().collection("users").get();
    for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        const alarmsSnapshot = await admin.firestore().collection(`users/${userId}/alarms`).get();
        for (const alarmDoc of alarmsSnapshot.docs) {
            const alarm = alarmDoc.data();
            const currentRate = await getCurrentRate(alarm.fromCurrency, alarm.toCurrency);
            if (currentRate && currentRate <= alarm.targetRate) {
                await sendNotification(alarm.userToken, "Currency Rate Alert", `The rate for ${alarm.fromCurrency} to ${alarm.toCurrency} has reached ${currentRate}`);
            }
        }
    }
});
