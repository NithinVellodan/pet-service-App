import 'react-native-gesture-handler';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    BackHandler,
    Alert,
    StatusBar,
    NativeModules,
    Platform,
    PermissionsAndroid,
    FlatList,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';

// packages
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-notifications';
import Modal from 'react-native-modal';
import messaging from '@react-native-firebase/messaging';
import notifee, {
    AndroidImportance,
    AndroidLaunchActivityFlag,
    AndroidStyle,
    EventType,
} from '@notifee/react-native';
import LinearGradient from 'react-native-linear-gradient';
import RNExitApp from 'react-native-exit-app';

//constants
import {Context} from '../../contexts/Store';
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {
    EcommerceApiProductCart2,
    EcommerceApiProductWishList,
} from './EcommerceCustomerApi';
import {usersConfigGeneral} from '../../../axiosConfig';
import {getCustomerPetWishlist, getCustomerStayWishlist} from './ApiSection';
import {ApiGeneralLatestOffers, toggleUserRole} from '../common/ApiGeneral';
import {requestUserPermission} from '../../utlis/notificationServices';
import {getCustomerTrainerWishlist} from './TrainerApiSection';
import CustomToast from '../../components/toast/CustomToast';
import {useChatContext} from '../../contexts/ChatContext';

// Component
import LoaderSimple from '../includes/pageLoader/LoaderSimple';
import LoaderCardHome from '../includes/pageLoader/LoaderCardHome';
import LoaderHomeBottom from '../includes/pageLoader/LoaderHomeBottom';
import MainHomeHeader from './includes/MainHomeHeader';
import HomeServiceBooking from '../Home/includes/HomeServiceBooking';
import HomeCustomerArrivals from '../Home/includes/HomeCustomerArrivals';
import HomeContent from './HomeContent';
import AuthScreen from '../Home/AuthScreen';
import LostBannerSection from './includes/LostBannerSection';
import FilterCommon from './includes/FilterCommon';
import ModalScreen from '../Profile-related/ModalScreen';
import UserLogin from '../booking/includes/UserLogin';

export default function MainHome({route}) {
    const {state, dispatch} = useContext(Context);
    const [pageLoader, setPageLoader] = useState(false);
    const [latestOffers, setLatestOffers] = useState(false);
    const navigation = useNavigation();
    const {StatusBarManager} = NativeModules;
    const isFocused = useIsFocused();
    const toastRef = useRef();
    const {currentChatId} = useChatContext();
    const [selectedValue, setSelectedValue] = useState(1);
    const [isType, setType] = useState('mail');
    const [userModal, setUserModal] = useState(false);
    const [screen, setScreen] = useState(false);
    const [is_Firbase, setIs_Firbase] = useState({
        is_fireBase: false,
        email: '',
        google_id_token: '',
    });

    const [calModalVisible, setCalModalVisible] = useState(false);

    const updateUserDate = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };

    ////////////////////////// notifications //////////////////////////

    useEffect(() => {
        if (Platform.OS == 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            )
                .then(res => {
                    if (!!res && res == 'granted') {
                        requestUserPermission(state);
                    }
                })
                .catch(error => {
                    Alert.alert('something wrong');
                });
        } else {
            requestUserPermission(state);
        }
    }, [state.userData.is_login]);

    useEffect(() => {
        const handleNotificationPress = async notification => {
            const notificationData = notification.data;
            if (state.userData.is_login) {
                // Your existing navigation logic based on the notification data
                if (notificationData.section === '20') {
                    markAsRead(notificationData.notification_id);
                    if (!state.userData.is_service) {
                        updateUserDate({...state.userData, is_service: true});
                    }
                    if (
                        notificationData.notification_type ===
                        'place_to_stay_booking'
                    ) {
                        navigation.navigate('BookingItem', {
                            item_id: notificationData.redirect_pk,
                        });
                    } else if (
                        notificationData.notification_type === 'trainer'
                    ) {
                        navigation.navigate('TrainerProviderBooking', {
                            item: notificationData,
                            type: 'notification',
                        });
                    } else {
                        navigation.navigate('BorrowBookingSinge', {
                            item_id: notificationData.redirect_pk,
                        });
                    }
                } else if (notificationData.section === '10') {
                    markAsRead(notificationData.notification_id);
                    if (state.userData.is_service) {
                        updateUserDate({...state.userData, is_service: false});
                    }
                    if (
                        notificationData.notification_type ===
                        'place_to_stay_booking'
                    ) {
                        navigation.navigate('CustomerBookingPlace', {
                            item: notificationData,
                            type: 'notification',
                        });
                    } else if (
                        notificationData.notification_type === 'trainer'
                    ) {
                        navigation.navigate('TrainerBookingSingle', {
                            item: notificationData,
                            type: 'notification',
                        });
                    } else {
                        navigation.navigate('BookingSectionStack', {
                            screen: 'Bookings',
                            params: {
                                selectedFilter: {
                                    id: 2,
                                    type: 'Borrow a Pet',
                                    page_type: 'borrow-pet',
                                },
                                item: notificationData,
                                type: 'notification',
                            },
                        });
                    }
                } else if (notificationData.section === '40') {
                    markAsRead(notificationData.notification_id);
                    if (!state.userData.is_service) {
                        updateUserDate({...state.userData, is_service: true});
                    }
                    if (
                        notificationData.notification_type === 'ecommerce_order'
                    ) {
                        navigation.navigate('OrderDetails', {
                            order: notificationData.redirect_pk,
                        });
                    } else if (
                        notificationData.notification_type === 'donated_order'
                    ) {
                        navigation.navigate('DonateSummary', {
                            donate: notificationData.redirect_pk,
                        });
                    }
                } else if (notificationData.section === '30') {
                    markAsRead(notificationData.notification_id);
                    if (state.userData.is_service) {
                        updateUserDate({...state.userData, is_service: false});
                    }
                    if (
                        notificationData.notification_type === 'ecommerce_order'
                    ) {
                        navigation.navigate('OrderDetailConfirmed', {
                            order_id: notificationData.redirect_pk,
                            notification: true,
                        });
                    } else if (
                        notificationData.notification_type === 'donated_order'
                    ) {
                        navigation.navigate('DonateCustomerSingle', {
                            order_id: notificationData.redirect_pk,
                            notification: true,
                        });
                    }
                } else if (
                    notificationData.section === 'place_to_stay' ||
                    notificationData.section === 'borrow_a_pet' ||
                    notificationData.section === 'trainer'
                ) {
                    navigation.navigate('ChatInner', {
                        item: {
                            otherUser: {
                                id: notificationData.sender,
                                name: notificationData.name,
                            },
                        },
                        userId: state?.userData?.firebaseUid,
                        chatType: notificationData.section,
                        profile: notificationData.profileImage,
                    });
                } else if (notificationData.section === 'donate') {
                    navigation.navigate('EcommerceChatInner', {
                        item: {
                            otherUser: {
                                id: notificationData.sender,
                                name: notificationData.name,
                            },
                        },
                        userId: state?.userData?.firebaseUid,
                        chatType: notificationData.section,
                        profile: notificationData.profileImage,
                    });
                }

                try {
                    const displayedNotifications =
                        await notifee.getDisplayedNotifications();
                    const notificationsToCancel = displayedNotifications.filter(
                        displayedNotification =>
                            displayedNotification.notification.data.channel ===
                            notificationData.channel,
                    );

                    for (const notificationToCancel of notificationsToCancel) {
                        await notifee.cancelNotification(
                            notificationToCancel.id,
                        );
                    }
                } catch (error) {
                    console.log('Error canceling notifications:', error);
                }
            } else {
                return;
            }
        };

        const handleNotification = async remoteMessage => {
            if (Platform.OS === 'ios') {
                await notifee.requestPermission();
            }

            let notificationData;
            try {
                // Safely parse the notification data
                const apnsData = remoteMessage.data?.apns
                    ? JSON.parse(remoteMessage.data.apns)
                    : {};
                notificationData = remoteMessage.data?.data
                    ? JSON.parse(remoteMessage.data.data)
                    : {};

                // console.log('Parsed notification data:', notificationData);
            } catch (error) {
                console.log('Error parsing notification data:', error);
                return;
            }

            if (currentChatId && currentChatId === notificationData.channel) {
                // User is in the same chat, prevent notification
                return;
            }
            if (!notificationData.notification_type) {
                // console.log('Notification type is missing or invalid.');
                return;
            }

            if (notificationData.section === '10') {
                dispatch({
                    type: 'UPDATE_READ_SECTION',
                    readSection: {
                        ...state.readSection,
                        un_read_booking_customer: true,
                    },
                });
            } else if (notificationData.section === '20') {
                dispatch({
                    type: 'UPDATE_READ_SECTION',
                    readSection: {
                        ...state.readSection,
                        un_read_booking_provider: true,
                    },
                });
            } else if (notificationData.section === '30') {
                dispatch({
                    type: 'UPDATE_READ_SECTION',
                    readSection: {
                        ...state.readSection,
                        un_read_booking_ecom_customer: true,
                    },
                });
            } else if (notificationData.section === '40') {
                dispatch({
                    type: 'UPDATE_READ_SECTION',
                    readSection: {
                        ...state.readSection,
                        un_read_booking_ecom_provider: true,
                    },
                });
            } else if (
                notificationData.section === 'place_to_stay' ||
                notificationData.section === 'borrow_a_pet' ||
                notificationData.section === 'trainer'
            ) {
                dispatch({
                    type: 'UPDATE_READ_SECTION',
                    readSection: {
                        ...state.readSection,
                        unread_chats: true,
                    },
                });
            } else if (notificationData.section === 'donate') {
                dispatch({
                    type: 'UPDATE_READ_SECTION',
                    readSection: {
                        ...state.readSection,
                        unread_chats_ecom: true,
                    },
                });
            }
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
                data: notificationData,
                android: {
                    channelId,
                    groupId,
                    groupSummary: true,
                    pressAction: {
                        id: 'default',
                        launchActivity: 'default',
                        launchActivityFlags: [
                            AndroidLaunchActivityFlag.SINGLE_TOP,
                        ],
                    },
                    importance: AndroidImportance.HIGH,
                    style: {
                        type: AndroidStyle.MESSAGING,
                        person: {
                            name:
                                notificationData.name || notificationData.title,
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
                    summaryArgument:
                        notificationData.name || notificationData.title,
                    summaryArgumentCount: 1,
                    attachments: notificationData.profileImage
                        ? [
                              {
                                  url: notificationData.profileImage,
                                  thumbnailHidden: false,
                              },
                          ]
                        : [],
                },
            });
        };

        const foregroundUnsubscribe = notifee.onForegroundEvent(
            async ({type, detail}) => {
                const {notification} = detail;

                switch (type) {
                    case EventType.DELIVERED:
                        handleNotification(notification);
                        break;
                    case EventType.PRESS:
                        handleNotificationPress(notification);
                        break;
                }
            },
        );

        const backgroundUnsubscribe = notifee.onBackgroundEvent(
            async ({type, detail}) => {
                const {notification} = detail;

                switch (type) {
                    case EventType.DELIVERED:
                        handleNotification(notification);
                        break;
                    case EventType.PRESS:
                        handleNotificationPress(notification);
                        break;
                }
            },
        );

        const unsubscribeMessaging = messaging().onMessage(
            async remoteMessage => {
                handleNotification(remoteMessage);
                // console.log('remoteMessage', remoteMessage);
            },
        );

        return () => {
            if (foregroundUnsubscribe) {
                foregroundUnsubscribe();
            }
            if (backgroundUnsubscribe) {
                backgroundUnsubscribe();
            }
            if (unsubscribeMessaging) {
                unsubscribeMessaging();
            }
        };
    }, [currentChatId]);

    ////////////////////////// notifications //////////////////////////

    // states
    const [selectedFilter, setSelectedFilter] = useState({
        id: 1,
        type: 'Place to Stay',
        page_type: 'place-to-stay',
    });

    // api connection functions
    getCustomerStayWishlist();
    getCustomerPetWishlist();
    getCustomerTrainerWishlist();
    EcommerceApiProductWishList();
    EcommerceApiProductCart2();
    ApiGeneralLatestOffers(setLatestOffers);

    //notification mark as read function
    const markAsRead = async id => {
        try {
            const response = await usersConfigGeneral.post(
                `mark-as-read/`,
                {notification_id: id},
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleFilterClick = index => {
        setSelectedFilter(index);
    };

    useEffect(() => {
        if (state.userData.is_service) {
            toggleUserRole('service_provider');
        } else {
            toggleUserRole('customer');
        }
    }, [state.userData.is_service]);

    const FilterItem = [
        {
            id: 1,
            type: 'Place to Stay',
            page_type: 'place-to-stay',
        },
        {
            id: 2,
            type: 'Borrow a Pet',
            page_type: 'borrow-pet',
        },
        {
            id: 3,
            type: 'Trainer',
            page_type: 'trainer',
        },
    ];

    useEffect(() => {
        const backAction = () => {
            if (navigation.isFocused() && route?.name === 'MainHome') {
                Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    {text: 'YES', onPress: () => RNExitApp.exitApp()},
                ]);
                return true;
            }

            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [navigation, route?.name]);

    const [modalScreens, setModalScreens] = useState('detail');

    // Login bottom sheet is disabled so the app can be browsed without auth.
    // useEffect(() => {
    //     if (!state.userData.is_login) {
    //         setTimeout(
    //             () => {
    //                 setCalModalVisible(true);
    //             },
    //             Platform.OS === 'ios' ? 1000 : 500,
    //         );
    //     }
    // }, [state.userData.is_login]);

    useEffect(() => {
        // if (route?.params?.goto === 'login' && !calModalVisible) {
        //     setModalScreens('login');
        //     setTimeout(
        //         () => {
        //             setCalModalVisible(true);
        //         },
        //         Platform.OS === 'ios' ? 1000 : 500,
        //     );
        // } else
        if (route?.params?.goto === 'detail' && !calModalVisible) {
            setModalScreens('detail');
            setCalModalVisible(true);
        }
    }, [route]);

    useEffect(() => {
        if (isFocused) {
            updateUserDate({
                ...state.userData,
                tempStateBookingNav: null,
            });
        }
    }, [isFocused]);

    const renderItem = ({item}) => (
        <View style={styles.offerImageContainer}>
            <Image style={styles.offerImage} source={{uri: item.image}} />
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={
                    !state.userData.is_service ? '#024474' : '#007EA7'
                }
            />
            <MainHomeHeader
                pageLoader={pageLoader}
                state={state}
                navigation={navigation}
            />
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={['#ffffff', '#f6f6f6', '#f5f5f5']}
                    style={styles.subContainer}>
                    {pageLoader ? (
                        <LoaderSimple />
                    ) : (
                        <LostBannerSection
                            state={state}
                            setUserModal={setUserModal}
                            setScreen={setScreen}
                        />
                    )}
                    {pageLoader ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                marginTop: SIZE(30),
                            }}>
                            <LoaderCardHome />
                            <LoaderCardHome />
                            <LoaderCardHome />
                            <LoaderCardHome />
                            <View
                                style={{
                                    alignItems: 'center',
                                    width: '100%',
                                    marginBottom: -SIZE(20),
                                }}>
                                <LoaderCardHome />
                            </View>
                        </View>
                    ) : (
                        <>
                            <HomeContent navigation={navigation} />
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    navigation.navigate('Upcoming');
                                }}
                                style={styles.bottomImageContainer}>
                                <View style={styles.imageMainContainerBottom}>
                                    <View style={styles.petImageContainer}>
                                        <Image
                                            style={styles.petImage}
                                            source={require('../../assets/images/image5.png')}
                                        />
                                    </View>
                                    <View style={styles.sectionDetailContainer}>
                                        <View style={styles.placeTextContainer}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.placeText}>
                                                Coming Soon
                                            </Text>
                                        </View>
                                        <View style={styles.spanContainer}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.spanText}>
                                                Leo vivamus auctor massa vitae
                                                id vel turpis.
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </>
                    )}
                    {pageLoader ? (
                        <LoaderHomeBottom />
                    ) : (
                        <>
                            <View style={styles.recentBookingContainer}>
                                <View style={styles.reviewsHead}>
                                    {!state.userData.is_service ? (
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.reviewsText}>
                                            New Arrivals
                                        </Text>
                                    ) : (
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.reviewsText}>
                                            Latest Bookings
                                        </Text>
                                    )}
                                    <TouchableOpacity
                                        onPress={() => {
                                            state.userData.is_service
                                                ? navigation.navigate(
                                                      'BookingSectionStack',
                                                      {
                                                          screen: 'Bookings',
                                                          params: {
                                                              selectedFilter:
                                                                  selectedFilter,
                                                              isFromHome: true,
                                                          },
                                                      },
                                                  )
                                                : navigation.navigate(
                                                      'NewArrival',
                                                      {
                                                          selectedFilter:
                                                              selectedFilter,
                                                      },
                                                  );
                                            // Bookings
                                        }}
                                        activeOpacity={0.8}>
                                        <Text
                                            allowFontScaling={false}
                                            style={[
                                                styles.reviewsViewText,
                                                {
                                                    color: !state.userData
                                                        .is_service
                                                        ? '#009FD3'
                                                        : '#003459',
                                                },
                                            ]}>
                                            View All
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <FilterCommon
                                    FilterItem={FilterItem}
                                    selectedFilter={selectedFilter}
                                    setSelectedFilter={setSelectedFilter}
                                    state={state}
                                    handleFilterClick={handleFilterClick}
                                    setSelectedValue={setSelectedValue}
                                />
                                {state.userData.is_service ? (
                                    <HomeServiceBooking
                                        selectedFilter={selectedFilter}
                                        isFocused={isFocused}
                                        state={state}
                                    />
                                ) : (
                                    <HomeCustomerArrivals
                                        navigation={navigation}
                                        selectedFilter={selectedFilter}
                                        isFocused={isFocused}
                                    />
                                )}
                            </View>
                            {!state.userData.is_service && (
                                <View style={styles.latestOffersContainer}>
                                    <View
                                        style={
                                            styles.latestOffersTextContainer
                                        }>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.latestOffersText}>
                                            Latest Offers
                                        </Text>
                                    </View>
                                    <FlatList
                                        data={latestOffers}
                                        renderItem={renderItem}
                                        keyExtractor={(item, index) =>
                                            index.toString()
                                        }
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={
                                            styles.flatListContent
                                        }
                                    />
                                </View>
                            )}
                        </>
                    )}
                </LinearGradient>
            </ScrollView>
            <View>
                <Modal
                    isVisible={calModalVisible}
                    animationInTiming={400}
                    animationOutTiming={400}
                    animationIn={'slideInUp'}
                    backdropOpacity={0.2}
                    useNativeDriver={false}
                    useNativeDriverForBackdrop={true}
                    deviceHeight={SIZES.height}
                    style={{
                        margin: 0,
                        height: '100%',
                        justifyContent: 'flex-end',
                        overflow: 'hidden',
                        borderTopRightRadius: SIZE(32),
                        borderTopLeftRadius: SIZE(32),
                        marginTop:
                            Platform.OS === 'ios'
                                ? StatusBarManager.HEIGHT +
                                  SIZES.height * 0.009 -
                                  SIZE(10)
                                : StatusBarManager.HEIGHT - SIZE(20),
                    }}
                    onBackdropPress={() => {
                        setCalModalVisible(false);
                        if (state.userData.is_login) {
                            updateUserDate({
                                ...state.userData,
                                is_skip: false,
                            });
                        } else {
                            updateUserDate({
                                ...state.userData,
                                is_skip: true,
                                name: '',
                            });
                        }
                    }}
                    onBackButtonPress={() => {
                        setCalModalVisible(false);
                        if (state.userData.is_login) {
                            updateUserDate({
                                ...state.userData,
                                is_skip: false,
                            });
                        } else {
                            updateUserDate({
                                ...state.userData,
                                is_skip: true,
                                name: '',
                            });
                        }
                    }}
                    propagateSwipe={true}
                    avoidKeyboard={true}>
                    <View
                        style={{
                            flex: 1,
                        }}>
                        <AuthScreen
                            modalScreens={modalScreens}
                            setModalScreens={setModalScreens}
                            calModalVisible={calModalVisible}
                            setCalModalVisible={setCalModalVisible}
                            toastRef={toastRef}
                        />
                    </View>
                    <Toast
                        renderToast={toastOptions => {
                            return <CustomToast toastOptions={toastOptions} />;
                        }}
                        successColor="#009FD3"
                        warningColor="orange"
                        ref={toastRef}
                        duration={2000}
                        offsetBottom={SIZE(100)}
                        placement={
                            modalScreens === 'forgot-password'
                                ? 'top'
                                : 'bottom'
                        }
                    />
                </Modal>
                <ModalScreen
                    isVisible={userModal}
                    setVisible={setUserModal}
                    inner={
                        <UserLogin
                            isType={isType}
                            close={setUserModal}
                            screen={screen}
                            is_Firbase={is_Firbase}
                            setIs_Firbase={setIs_Firbase}
                        />
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileImage: {
        width: null,
        height: null,
        flex: 1,
        borderRadius: SIZE(22),
        borderWidth: 1,
        borderColor: '#fff',
    },
    subContainer: {
        paddingVertical: SIZE(40),
        paddingHorizontal: SIZE(16),
    },
    explorePet: {
        borderWidth: 1,
        borderColor: '#003459',
        borderRadius: SIZE(8),
    },
    exploreTextContainer: {
        marginVertical: SIZE(15),
        marginHorizontal: SIZE(16),
    },
    exploreText: {
        alignSelf: 'center',
        color: '#003459',
        fontWeight: '500',
        fontSize: SIZE(16),
        fontFamily: FONTS.medium,
    },
    detailSection: {
        paddingTop: SIZE(48),
        borderRadius: SIZE(12),
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    imageMainContainer: {
        overflow: 'hidden',
        width: '48%',
        marginBottom: SIZE(16),
        borderRadius: SIZE(16),
        ...Platform.select({
            ios: {
                shadowColor: '#E9E9E9',
                shadowOffset: {width: 0.8, height: 0.8},
                shadowOpacity: 0.8,
                shadowRadius: SIZE(1),
            },
            android: {
                elevation: 1,
            },
        }),
        backgroundColor: '#FFFFFF',
    },
    sectionDetailContainer: {
        marginVertical: SIZE(16),
        marginHorizontal: SIZE(12),
        borderRadius: SIZE(16),
    },
    petImageContainer: {
        height: SIZE(127),
        borderTopRightRadius: SIZE(16),
    },
    petImage: {
        width: '100%',
        height: '100%',
    },
    placeTextContainer: {},
    placeText: {
        color: '#242424',
        fontWeight: '600',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
    },
    spanText: {
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
    },
    imageMainContainerBottom: {
        overflow: 'hidden',
        width: '48%',
        marginBottom: SIZE(16),
        borderRadius: SIZE(16),
        ...Platform.select({
            ios: {
                shadowColor: '#E9E9E9',
                shadowOffset: {width: 0.8, height: 0.8},
                shadowOpacity: 0.8,
                shadowRadius: SIZE(1),
            },
            android: {
                elevation: 1,
            },
        }),
        backgroundColor: '#FFFFFF',
    },

    bottomImageContainer: {
        alignSelf: 'center',
    },

    bottomContainer: {},
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    reviewsHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reviewsText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontWeight: '600',
        lineHeight: SIZE(24),
        fontFamily: FONTS.semiBold,
    },
    reviewsViewText: {
        color: '#003459',
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(24),
        letterSpacing: SIZE(0.5),
        fontFamily: FONTS.bold,
    },

    filterItem: {
        marginRight: SIZE(12),
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
    },
    selectedFilterItem: {
        marginRight: SIZE(12),
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
        borderWidth: 0.5,
        borderRadius: 20,
        borderColor: '#003459',
        backgroundColor: '#EAF7FF',
    },
    filterItemText: {
        fontSize: SIZE(14),
        color: '#242424',
        fontWeight: '600',
        lineHeight: SIZE(18),
        fontFamily: FONTS.semiBold,
    },
    selectedFilterItemText: {
        fontSize: SIZE(14),
        color: '#003459',
        fontWeight: '600',
        lineHeight: SIZE(18),
        fontFamily: FONTS.semiBold,
    },
    recentBookingContainer: {
        marginTop: SIZE(40),
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '10%',
        flexDirection: 'row',
    },
    dot: {
        marginHorizontal: SIZE(4),
        backgroundColor: '#003459',
    },
    paginator: {
        alignItems: 'center',
        marginTop: SIZE(16),
    },
    latestOffersContainer: {
        marginTop: SIZE(48),
    },
    latestOffersTextContainer: {
        marginBottom: SIZE(16),
    },
    latestOffersText: {
        fontSize: SIZE(18),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        color: '#00171F',
    },
    offerImageContainer: {
        overflow: 'hidden',
        width: SIZE(350),
        height: SIZE(149),
        borderRadius: SIZE(12),
        borderWidth: 1,
        borderColor: '#eee',
        marginRight: SIZE(20),
    },
    offerImage: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    flatListContent: {
        // paddingHorizontal: SIZE(15),
    },
});
