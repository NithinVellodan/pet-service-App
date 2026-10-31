/**
 * @format
 */

import {AppRegistry, Platform, LogBox} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import notifee, {
    AndroidImportance,
    AndroidLaunchActivityFlag,
    AndroidStyle,
    EventType,
} from '@notifee/react-native';

import {name as appName} from './app.json';

function HeadlessCheck({isHeadless}) {
    if (isHeadless) {
        // App has been launched in the background by iOS, ignore
        return null;
    }

    return <App />;
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
    onDisplayNotification(remoteMessage);
});

const onDisplayNotification = async remoteMessage => {
    if (Platform.OS === 'ios') {
        await notifee.requestPermission();
    }

    const apnsData = JSON.parse(remoteMessage.data.apns);
    const notificationData = JSON.parse(remoteMessage.data.data);

    // console.log(notificationData, 'notificationData From Closed State');

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: notificationData.notification_type,
        name: notificationData.notification_type,
        importance: AndroidImportance.HIGH,
    });

    const groupId =
        notificationData.channel || notificationData.notification_id;

    // Display a notification
    await notifee.displayNotification({
        title: notificationData.title,
        body: notificationData.message,
        data: {
            notification_type: notificationData.notification_type,
            redirect_pk: notificationData.redirect_pk,
            section: notificationData.section,
            notification_id: notificationData.notification_id,
            sender: notificationData.sender ? notificationData.sender : '',
            profileImage: notificationData.profileImage
                ? notificationData.profileImage
                : '',
            name: notificationData.name ? notificationData.name : '',
        },
        android: {
            channelId,
            groupId,
            groupSummary: true,
            pressAction: {
                id: 'default',
                launchActivity: 'default',
                launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
            },
            importance: AndroidImportance.HIGH,
            style: {
                type: AndroidStyle.MESSAGING,
                person: {
                    name: notificationData.name || notificationData.title,
                    icon: notificationData.profileImage || '',
                },
                messages: [
                    {
                        text: notificationData.message,
                        timestamp: Date.now(),
                    },
                ],
            },
        },
        ios: {
            threadId: groupId,
            summaryArgument: notificationData.name || notificationData.title,
            summaryArgumentCount: 1,
            attachments: notificationData.profileImage
                ? [
                      {
                          url: notificationData.profileImage,
                          thumbnailHidden: false,
                      },
                  ]
                : undefined,
        },
    });
};

notifee.onBackgroundEvent(async ({type, detail}) => {
    // console.log(detail, 'detail from bg');
    switch (type) {
        case EventType.DISMISSED:
        // console.log('dismissed from bg');
        // try {
        //     const displayedNotifications =
        //         await notifee.getDisplayedNotifications();
        //     const notificationsToCancel = displayedNotifications.filter(
        //         displayedNotification =>
        //             displayedNotification.notification.data.channel ===
        //             notificationData.channel,
        //     );

        //     for (const notificationToCancel of notificationsToCancel) {
        //         await notifee.cancelNotification(notificationToCancel.id);
        //     }
        // } catch (error) {
        //     console.log('Error canceling notifications:', error);
        // }
        // break;
        case EventType.PRESS:
            // console.log('pressed from bg');
            break;
    }
});

AppRegistry.registerComponent(appName, () => HeadlessCheck);
// LogBox.ignoreAllLogs();
