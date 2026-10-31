const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendNotification = functions.firestore
    .document('chats/{chatId}/messages/{messageId}')
    .onCreate(async (snap, context) => {
        console.log('New message received:', snap.data());
        const message = snap.data();
        const sender = message.sender;
        const recipient = message.recipient;

        // Get the FCM token of the recipient
        const recipientDoc = await admin
            .firestore()
            .collection('users')
            .doc(recipient)
            .get();
        const recipientFcmToken = recipientDoc.data().fcmToken;

        // Prepare the notification payload
        const payload = {
            notification: {
                title: `New message from ${sender}`,
                body: message.body || 'New message received',
            },
        };

        // Send the notification
        return admin.messaging().sendToDevice(recipientFcmToken, payload);
    });
