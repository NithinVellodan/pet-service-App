import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

//packages
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

//components
import ServiceSingleCardTrainer from './includes/ServiceSingleCardTrainer';
import PaymentCardTrainerProvider from './includes/PaymentCardTrainerProvider';

//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {
    ApiSectionTrainerProviderBookingSingle,
    TrainerProviderSinglePageAction,
} from '../../ApiSectionTrainerProvider';
import {Context} from '../../../../contexts/Store';

//images and logos
import BackIcon from '../../../../assets/icons/profile-icons/arrow-left.svg';
import MessageIcon from '../../../../assets/icons/booking/message.svg';

const TrainerProviderBooking = ({route}) => {
    const navigation = useNavigation();
    const {state} = useContext(Context);

    const [trainerBookingData, setTrainerBookingData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userId, setUserId] = useState(state?.userData?.firebaseUid);
    const [userIdFromEmail, setUserIdFromEmail] = useState(null);
    const [users, setUsers] = useState([]);
    const id = route?.params?.item_id;
    const [formattedDate3, setFormattedDate3] = useState(null);

    useEffect(() => {
        if (trainerBookingData && trainerBookingData.date_added) {
            const dateObject = new Date(trainerBookingData.date_added);
            const day = dateObject.getDate();
            const month = new Intl.DateTimeFormat('en-US', {
                month: 'short',
            }).format(dateObject);
            const year = dateObject.getFullYear();
            const formattedDate = `${day} ${month} ${year}`;
            setFormattedDate3(formattedDate);
        }
    }, [trainerBookingData]);

    // firebase user get function
    useEffect(() => {
        getUserData()
            .then(res => setUsers(res))
            .catch(error => console.log('error', error));
    }, []);

    const getUserData = async () => {
        const userRef = await firestore().collection('users').get();
        const userListData = Promise.all(
            userRef.docs
                .filter(item => {
                    return item.id != userId;
                })
                .map(async item => {
                    const id = item.id;
                    const name = item.data().name;
                    const mail = item.data().mail;
                    return {
                        id,
                        name,
                        mail,
                    };
                }),
        );

        return userListData;
    };

    // //firebase filter id
    useEffect(() => {
        if (
            trainerBookingData &&
            trainerBookingData.customer_details &&
            trainerBookingData.customer_details.email
        ) {
            const emailToFind = trainerBookingData.customer_details.email;
            const matchedUser = users.find(user => user.mail === emailToFind);
            if (matchedUser) {
                setUserIdFromEmail(matchedUser.id);
            } else {
                setUserIdFromEmail(null);
            }
        }
    }, [trainerBookingData, users]);

    ApiSectionTrainerProviderBookingSingle(
        setTrainerBookingData,
        id,
        setIsLoading,
        refreshing,
        setErrorMessage,
    );

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        if (route?.params?.type === 'notification') {
                            navigation.goBack();
                        } else {
                            navigation.navigate('Bookings', {
                                selectedFilter: {
                                    id: 3,
                                    type: 'Trainer',
                                    page_type: 'trainer',
                                },
                            });
                        }
                    }}
                    style={styles.backButton}>
                    <BackIcon width={SIZE(24)} height={SIZE(24)} />
                </TouchableOpacity>
                <View style={styles.headerRight}>
                    <Text style={styles.borrowPetText}>
                        {trainerBookingData?.customer_details?.name}
                    </Text>
                    <View style={styles.headDetailRight}>
                        <Text style={styles.headDetailRightText}>
                            {formattedDate3}
                        </Text>
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <View style={styles.bottomContainer}>
                    <ServiceSingleCardTrainer
                        data={trainerBookingData?.services}
                    />
                </View>
                <View style={styles.paymentSection}>
                    <PaymentCardTrainerProvider data={trainerBookingData} />
                </View>
            </ScrollView>
            <TouchableOpacity
                disabled={
                    userIdFromEmail === null
                        ? true
                        : false || userId === null
                        ? true
                        : false
                }
                onPress={() => {
                    const chatType = 'trainer';
                    navigation.navigate('ChatInner', {
                        item: {
                            otherUser: {
                                id: userIdFromEmail,
                                name: trainerBookingData?.customer_details
                                    ?.name,
                            },
                        },
                        userId: userId,
                        chatType: chatType,
                        profile: trainerBookingData?.customer_details?.image,
                        provider: true,
                    });
                }}
                activeOpacity={0.8}
                style={styles.message}>
                <MessageIcon width={SIZE(24)} height={SIZE(24)} />
            </TouchableOpacity>
            {trainerBookingData?.booking_status == 'incoming' && (
                <View style={styles.bottomButton}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.declineButton}
                        onPress={async () => {
                            try {
                                const response =
                                    await TrainerProviderSinglePageAction(
                                        state,
                                        trainerBookingData.id,
                                        'reject',
                                    );
                                route.params.setBookingStatus('reject');
                                navigation.goBack();
                            } catch (error) {
                                console.log('Error: ', error);
                                navigation.goBack();
                            }
                        }}>
                        <Text style={styles.declineButtonText}>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={async () => {
                            try {
                                const response =
                                    await TrainerProviderSinglePageAction(
                                        state,
                                        trainerBookingData.id,
                                        'accept',
                                    );
                                route.params.setBookingStatus('accept');
                                navigation.goBack();
                            } catch (error) {
                                console.log('Error: ', error);
                                navigation.goBack();
                            }
                        }}
                        activeOpacity={0.8}
                        style={styles.acceptButton}>
                        <Text style={styles.acceptButtonText}>Accept</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default TrainerProviderBooking;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'f7f7f7',
        flex: 1,
    },
    headerContainer: {
        paddingVertical: SIZE(16),
        paddingHorizontal: SIZE(16),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#0000001A',
    },
    backButton: {
        width: SIZE(40),
        height: SIZE(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 100,
        backgroundColor: '#fff',
        marginRight: SIZE(20),
    },
    headerRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    borrowPetText: {
        fontSize: SIZE(20),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(25),
        color: '#00171F',
    },

    headDetailRightText: {
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
        lineHeight: SIZE(17),
    },

    bottomContainer: {
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(24),
    },
    paymentSection: {
        paddingHorizontal: SIZE(16),
        marginTop: SIZE(24),
        marginBottom: SIZE(38),
    },
    message: {
        position: 'absolute',
        bottom: SIZE(120),
        right: SIZE(16),
        backgroundColor: '#003459',
        padding: SIZE(20),
        borderRadius: 100,
    },
    bottomButton: {
        backgroundColor: '#fff',
        paddingHorizontal: SIZE(16),
        paddingTop: SIZE(24),
        paddingBottom: SIZE(32),
        marginTop: SIZE(40),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: '#E2E2E2',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    declineButton: {
        borderWidth: 1,
        borderColor: '#009FD3',
        borderRadius: SIZE(8),
        paddingVertical: SIZE(14),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZE(20),
        width: SIZE(180),
    },
    declineButtonText: {
        color: '#009FD3',
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(22),
        fontFamily: FONTS.bold,
        letterSpacing: 0.5,
    },
    acceptButton: {
        backgroundColor: '#003459',
        justifyContent: 'center',
        alignItems: 'center',
        width: SIZE(180),
        borderRadius: SIZE(8),
        paddingVertical: SIZE(14),
    },
    acceptButtonText: {
        color: '#fff',
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(22),
        fontFamily: FONTS.bold,
        letterSpacing: 0.5,
    },
});
