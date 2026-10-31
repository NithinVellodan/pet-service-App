/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initializes your application
admin.initializeApp();

exports.sendNotification = functions.firestore
    .document('chats/{chatId}/messages/{messageId}')
    .onCreate(async (snap, context) => {
        try {
            const message = snap.data();
            const sender = message.sender;
            const recipient = message.recipient;
            const channel = message.channel;
            const name = message.name;
            const section = message.section;
            const profileImage = message.profileImage;

            // Get the FCM token of the recipient
            const recipientDoc = await admin
                .firestore()
                .collection('users')
                .doc(recipient)
                .get();
            const recipientFcmToken = recipientDoc.data().fcmToken;

            // Prepare the notification payload
            const payload = {
                data: {
                    apns: JSON.stringify({
                        headers: {
                            'apns-push-type': 'background',
                            'apns-topic': 'com.pettoplace', // replace with your app bundle ID
                            'apns-priority': '5',
                        },
                        payload: {
                            aps: {
                                contentAvailable: true,
                            },
                        },
                    }),
                    data: JSON.stringify({
                        notification_type: 'chat_message',
                        name: name,
                        sender: sender,
                        section: section,
                        channel: channel,
                        profileImage: profileImage,
                        notification_id: context.params.messageId,
                        message:
                            message.body !== ''
                                ? message.body
                                : message.type || 'New message received',
                        title: `New message from ${name}`,
                        redirect_pk: 'default_redirect_pk',
                    }),
                    priority: 'high',
                },
            };
            // Send the notification
            const response = await admin
                .messaging()
                .sendToDevice(recipientFcmToken, payload, {
                    contentAvailable: true,
                    priority: 'high',
                });
        } catch (error) {
            // console.log('Error sending notification:', error);
        }
    });
