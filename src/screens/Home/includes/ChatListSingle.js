import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

//packages
import {useNavigation} from '@react-navigation/native';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//images and logos
import AvatarImage from '../../../assets/icons/avatar-new.svg';

const ChatListSingle = ({
    item,
    state,
    userId,
    contact,
    unreadCount,
    isRead,
    ecomm,
    resetUnreadCount,
}) => {
    const navigation = useNavigation();

    const formatTime = () => {
        const now = new Date();
        const messageTime = item.lastMessage?.timestamp?.toDate();
        const diffMinutes = Math.floor((now - messageTime) / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMinutes < 60) {
            return diffMinutes === 1
                ? '1 min'
                : diffMinutes < 1
                ? 'Just Now'
                : `${diffMinutes} mins`;
        } else if (diffHours < 24) {
            return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
        } else if (diffDays < 5) {
            return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
        } else {
            return messageTime?.toLocaleDateString('en-US');
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                resetUnreadCount();
                if (ecomm) {
                    navigation.navigate('EcommerceChatInner', {
                        item: item,
                        userId: userId,
                        chatType: item.chatType,
                        profile: item.otherUser?.profileImageUrl,
                    });
                } else {
                    navigation.navigate('ChatInner', {
                        item: item,
                        userId: userId,
                        chatType: item.chatType,
                        profile: item.otherUser?.profileImageUrl,
                    });
                }
            }}
            style={[styles.chatMain, {opacity: isRead ? 0.4 : 1}]}>
            <View style={styles.chatLeft}>
                {item?.otherUser?.profileImageUrl ? (
                    <View style={styles.profileContainer}>
                        <Image
                            style={styles.profileImage}
                            source={{uri: item?.otherUser?.profileImageUrl}}
                        />
                    </View>
                ) : (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: SIZE(16),
                        }}>
                        <AvatarImage width={SIZE(48)} height={SIZE(48)} />
                    </View>
                )}

                <View style={styles.titleContainer}>
                    <Text numberOfLines={1} style={styles.nameText}>
                        {!contact ? item.name : item.otherUser?.name}
                    </Text>
                    <Text numberOfLines={2} style={styles.messageText}>
                        {item.lastMessage?.type === 'Text'
                            ? item.lastMessage?.body
                            : item.lastMessage?.type === 'Image'
                            ? 'Image'
                            : item.lastMessage?.type === 'Document'
                            ? 'Document'
                            : item.lastMessage?.type === 'Audio'
                            ? 'Audio'
                            : item.lastMessage?.type === 'Location'
                            ? 'Location'
                            : item.lastMessage?.type === 'Link'
                            ? 'Link'
                            : item.lastMessage?.type === 'Product'
                            ? 'Product Request'
                            : item.lastMessage?.type === 'Place'
                            ? 'Place To Stay'
                            : item.lastMessage?.type === 'Borrow'
                            ? 'Borrow A Pet'
                            : item.lastMessage?.type === 'Trainer'
                            ? 'Trainer'
                            : null}
                    </Text>
                </View>
            </View>
            <View style={styles.notification}>
                <Text style={styles.timeText}>
                    {formatTime(item.lastMessage)}
                </Text>
                {unreadCount ? (
                    <View
                        style={[
                            styles.notificationSub,
                            {
                                backgroundColor: !state?.userData?.is_service
                                    ? '#009FD3'
                                    : '#003459',
                            },
                        ]}>
                        <Text style={styles.notifyText}>{unreadCount}</Text>
                    </View>
                ) : null}
            </View>
        </TouchableOpacity>
    );
};

export default ChatListSingle;

const styles = StyleSheet.create({
    chatMain: {
        flexDirection: 'row',
        paddingVertical: SIZE(16),
        justifyContent: 'space-between',
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
    },
    chatLeft: {
        flexDirection: 'row',
        width: '75%',
    },
    profileContainer: {
        overflow: 'hidden',
        borderRadius: SIZE(48),
        width: SIZE(48),
        height: SIZE(48),
        marginRight: SIZE(16),
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        width: SIZE(240),
    },
    nameText: {
        color: '#242424',
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        fontSize: SIZE(16),
    },
    messageText: {
        color: '#969696',
        fontFamily: FONTS.regular,
        fontWeight: '400',
        fontSize: SIZE(14),
    },
    notification: {
        justifyContent: 'space-between',
    },
    timeText: {
        color: '#969696',
        fontFamily: FONTS.regular,
        fontWeight: '400',
        fontSize: SIZE(12),
    },
    notificationSub: {
        width: SIZE(21),
        height: SIZE(21),
        backgroundColor: '#003459',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(21),
        alignSelf: 'flex-end',
    },
    notifyText: {
        color: '#fff',
        fontFamily: FONTS.bold,
        fontWeight: '600',
        fontSize: SIZE(12),
        textAlign: 'center',
    },
});
