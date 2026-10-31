import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

//packages
import firestore from '@react-native-firebase/firestore';

//constants
import {Context} from '../../../../contexts/Store';
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

//components
// import FilterCommon from '../maincludes/FilterCommon';
import ChatListSingle from '../../../../screens/Home/includes/ChatListSingle';
import Headers from '../../../../screens/includes/headers/Headers';

//images and logos
import SpotLightLogo from '../../../../assets/icons/emptychat.svg';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

const EcommerceChat = ({route}) => {
    const {state, dispatch} = useContext(Context);
    const isFocused = useIsFocused();
    //states
    const [chatFilter, setChatFilter] = useState(false);
    const [chatFilterList, setChatFilterList] = useState(null);
    const [userId, setUserId] = useState(state?.userData?.firebaseUid);
    const [chatList, setChatList] = useState([]);
    const [filteredData, setFilteredData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [filterOptions] = useState([
        {label: 'All', value: null},
        {label: 'Unread', value: 2},
    ]);
    const updateUserData = () => {
        dispatch({
            type: 'UPDATE_READ_SECTION',
            readSection: {
                ...state.readSection,
                unread_chats_ecom: false,
            },
        });
    };
    // unsubscribe getModChatList function
    useEffect(() => {
        const unsubscribe = getModChatList();
        return () => {
            if (state.userData.is_login) {
                unsubscribe();
            } else {
                setChatList([]);
                setFilteredData([]);
            }
            updateUserData();
        };
    }, [userId, isFocused, state.userData.is_login]);

    useEffect(() => {
        setUserId(state?.userData?.firebaseUid);
    }, [state?.userData?.firebaseUid, isFocused]);

    //chat list function

    const getModChatList = () => {
        setIsLoading(true);
        const userRef = firestore().collection('users').doc(userId);

        const unsubscribe = firestore()
            .collection('chats')
            .where('participants', 'array-contains', userRef)
            .where('type', '==', 'donate')
            .onSnapshot(
                async snapshot => {
                    const newChatList = [];

                    try {
                        await Promise.all(
                            snapshot.docs.map(async chatDoc => {
                                const data = chatDoc.data();
                                const participants = await Promise.all(
                                    data.participants
                                        .filter(item => item.id !== userId)
                                        .map(async user => {
                                            const userDoc = await user.get();
                                            if (userDoc.exists) {
                                                const userData = userDoc.data();
                                                return {
                                                    id: user.id,
                                                    name:
                                                        userData?.name ||
                                                        'Unknown',
                                                    profileImageUrl:
                                                        userData?.profileImageUrl ||
                                                        '',
                                                };
                                            } else {
                                                return {
                                                    id: user.id,
                                                    name: 'Unknown',
                                                    profileImageUrl: '',
                                                };
                                            }
                                        }),
                                );

                                const chatType = data.type;
                                const chatDocRef = chatDoc.ref;
                                const unreadCount = data.unreadCount;

                                const lastMessageSnapshot = await chatDocRef
                                    .collection('messages')
                                    .orderBy('timestamp', 'desc')
                                    .limit(1)
                                    .get();

                                const messages = lastMessageSnapshot.docs.map(
                                    doc => doc.data(),
                                );

                                if (
                                    participants.length > 0 &&
                                    messages.length > 0
                                ) {
                                    const newEntry = {
                                        lastMessage: messages[0],
                                        otherUser: participants[0],
                                        chatType,
                                        unreadCount,
                                        messages,
                                    };
                                    newChatList.push(newEntry);
                                }
                            }),
                        );

                        newChatList.sort((a, b) => {
                            const aTimestamp = a.lastMessage.timestamp
                                ? a.lastMessage.timestamp.toDate()
                                : new Date(0);
                            const bTimestamp = b.lastMessage.timestamp
                                ? b.lastMessage.timestamp.toDate()
                                : new Date(0);
                            return bTimestamp - aTimestamp;
                        });
                        setChatList(newChatList);
                    } catch (error) {
                        console.log('Error processing chat documents:', error);
                    }

                    setIsLoading(false);
                },
                error => {
                    console.log('Error in chat listener:', error);
                    setIsLoading(false);
                },
            );

        return unsubscribe;
    };

    // component to render list
    const renderItemTwo = ({item}) => {
        const isRead =
            item.unreadCount &&
            chatFilterList === 2 &&
            item.unreadCount[userId] === 0;
        return (
            <ChatListSingle
                ecomm={true}
                item={item}
                state={state}
                userId={userId}
                contact={true}
                unreadCount={item.unreadCount ? item.unreadCount[userId] : 0}
                isRead={isRead}
                resetUnreadCount={resetUnreadCount}
            />
        );
    };

    useEffect(() => {
        if (chatList?.length > 0) {
            setFilteredData(
                chatList.filter(chat => chat.chatType === 'donate'),
            );
        } else {
            setFilteredData([]);
        }
    }, [chatList]);

    useEffect(() => {
        if (chatList?.length > 0) {
            let filteredList = chatList.filter(chat => {
                return chat.chatType === 'donate';
            });
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                filteredList = filteredList.filter(chat => {
                    return chat.otherUser.name.toLowerCase().includes(query);
                });
            }

            setFilteredData(filteredList);
        }
    }, [chatList, searchQuery]);

    useEffect(() => {
        if (chatList.length > 0) {
            let filteredList = chatList.filter(chat => {
                return chat.chatType === 'donate';
            });
            const sortedChatList = filteredList.slice().sort((a, b) => {
                if (chatFilterList === 2) {
                    return (
                        (b.unreadCount ? b.unreadCount[userId] : 0) -
                        (a.unreadCount ? a.unreadCount[userId] : 0)
                    );
                }

                return 0;
            });

            setFilteredData(sortedChatList);
        }
    }, [chatList, chatFilterList, userId]);

    //reset count functions
    const resetUnreadCount = async () => {
        try {
            const userRef = firestore().collection('users').doc(userId);

            const snapshot = await firestore()
                .collection('chats')
                .where('participants', 'array-contains', userRef)
                .get();

            if (snapshot.empty) {
                return;
            }

            await Promise.all(
                snapshot.docs.map(chatDoc => {
                    const chatRef = chatDoc.ref;
                    return chatRef.update({
                        [`unreadCount.${userId}`]: 0,
                    });
                }),
            );
        } catch (error) {
            // console.log('Error resetting unread count:', error);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <Headers
                    headText={'Chat'}
                    chatList={true}
                    isSearch={isSearch}
                    setIsSearch={setIsSearch}
                    onPressSearch={() => {
                        setIsSearch(true);
                    }}
                    setSearchQuery={setSearchQuery}
                    setSearchQueryCustomer={setSearchQuery}
                    setChatFilter={setChatFilter}
                    chatFilterList={chatFilterList}
                    filterOptions={filterOptions}
                    setChatFilterList={setChatFilterList}
                />
                <View style={styles.chatList}>
                    {isLoading ? (
                        <ActivityIndicator
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            size="large"
                            color={
                                !state?.userData?.is_service
                                    ? '#007EA7'
                                    : '#003459'
                            }
                        />
                    ) : (
                        <FlatList
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{}}
                            data={filteredData}
                            renderItem={renderItemTwo}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={
                                <View style={styles.spotlightMain}>
                                    <View style={styles.spotlight}>
                                        <SpotLightLogo
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    </View>
                                    <View style={styles.bottom}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.mainText}>
                                            No Chats
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.subText}>
                                            Your Chat is empty now!
                                        </Text>
                                    </View>
                                </View>
                            }
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

export default EcommerceChat;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
    },
    chatMain: {
        paddingHorizontal: SIZE(16),
        // flex: 1
    },
    chatList: {
        paddingHorizontal: SIZE(16),

        flex: 1,
    },
    filterMain: {
        padding: SIZE(12),
        borderRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
        width: SIZE(149),
        position: 'absolute',
        right: SIZE(16),
        top: SIZE(65),
        zIndex: 1000,
    },
    buttonContainer: {
        padding: SIZE(8),
        borderRadius: SIZE(6),
    },
    buttonText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(12),
        fontWeight: '600',
        color: '#003459',
    },
    spotlightMain: {
        // flex: 1,
        height: SIZES.height - SIZE(250),
        alignItems: 'center',
        justifyContent: 'center',
    },
    spotlight: {
        width: SIZE(300),
        height: SIZE(300),
        marginBottom: SIZE(32),
    },
    mainText: {
        color: '#000',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(20),
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: SIZE(12),
    },
    subText: {
        color: '#686868',
        fontFamily: FONTS.regular,
        fontSize: SIZE(16),
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: SIZE(24),
    },
});
