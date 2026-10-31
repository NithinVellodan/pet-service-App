import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

// packages
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import firestore from '@react-native-firebase/firestore';

//constants
import {Context} from '../../contexts/Store';
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

// Icons
import LocationIcon from '../../assets/icons/location-icon.svg';
import MessageIcon from '../../assets/icons/booking/message.svg';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import BookingTopItems from './includes/BookingTopItems';
import BookingTopDate from './includes/BookingTopDate';
import BookingPaymentDetail from './includes/BookingPaymentDetail';
import {useRoute} from '@react-navigation/native';
import BookingFoodDetails from './includes/BookingFoodDetails';
import {
    ApiSectionServiceProviderBorrowSinglePage,
    ApiSectionServiceProviderBorrowSinglePageAction,
} from '../main/ApiSectionServiceProvider';

const BorrowBookingSinge = ({navigation}) => {
    const {state, dispatch} = useContext(Context);
    const route = useRoute();
    const [bookingData, setBookingData] = useState([]);
    const [petDetails, setPetDetails] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [formattedDate3, setFormattedDate3] = useState(null);
    const [userId, setUserId] = useState(state?.userData?.firebaseUid);
    const [userIdFromEmail, setUserIdFromEmail] = useState(null);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const bookingId = route.params.item_id;

    useEffect(() => {
        if (bookingData && bookingData.date_added) {
            const dateObject = new Date(bookingData.date_added);
            const day = dateObject.getDate();
            const month = new Intl.DateTimeFormat('en-US', {
                month: 'short',
            }).format(dateObject);
            const year = dateObject.getFullYear();
            const formattedDate = `${day} ${month} ${year}`;
            setFormattedDate3(formattedDate);
        }
    }, [bookingData]);

    ApiSectionServiceProviderBorrowSinglePage(
        bookingId,
        setBookingData,
        setPetDetails,
        setIsLoading,
    );

    //firebase user get function
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

    //firebase filter id
    useEffect(() => {
        if (
            bookingData &&
            bookingData.customer_details &&
            bookingData.customer_details.email
        ) {
            const emailToFind = bookingData.customer_details.email;
            const matchedUser = users.find(user => user.mail === emailToFind);
            if (matchedUser) {
                setUserIdFromEmail(matchedUser.id);
            } else {
                setUserIdFromEmail(null);
            }
        }
    }, [bookingData, users]);

    return (
        <>
            {isLoading ? (
                <ActivityIndicator
                    style={{
                        height: SIZES.height - SIZE(50),
                    }}
                    size={'large'}
                    color={'#009fd3'}
                />
            ) : (
                <View style={styles.container}>
                    <StatusBar
                        barStyle={'light-content'}
                        backgroundColor={'#007EA7'}
                    />
                    <ScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: SIZE(150)}}>
                        <View style={styles.topImageContainer}>
                            <View style={styles.commonButtonContainer}>
                                <View style={styles.topButtonLeft}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (
                                                route?.params?.type ===
                                                'notification'
                                            ) {
                                                navigation.goBack();
                                            } else {
                                                navigation.navigate(
                                                    'Bookings',
                                                    {
                                                        selectedFilter: {
                                                            id: 2,
                                                            type: 'Borrow a Pet',
                                                            page_type:
                                                                'borrow-pet',
                                                        },
                                                    },
                                                );
                                            }
                                        }}
                                        activeOpacity={0.8}
                                        style={styles.commonButtonMain}>
                                        <View style={styles.commonTopButtons}>
                                            <ArrowLeft
                                                width={'100%'}
                                                height={'100%'}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <SwiperFlatList
                                style={{height: SIZE(316)}}
                                onChangeIndex={index =>
                                    setCurrentIndex(index.index)
                                }
                                data={bookingData?.gallery}
                                renderItem={({item}) => (
                                    <View style={styles.swiperMain}>
                                        <Image
                                            source={{uri: item.image}}
                                            style={styles.swiperSub}
                                        />
                                    </View>
                                )}
                            />
                            {bookingData?.gallery?.length > 1 ? (
                                <View style={styles.swiperNumberMain}>
                                    <View style={styles.swiperNumber}>
                                        <Text style={styles.swiperNumberText}>
                                            {currentIndex + 1}/
                                            {bookingData?.gallery?.length}
                                        </Text>
                                    </View>
                                </View>
                            ) : (
                                ''
                            )}
                        </View>
                        {/* Booked Items */}
                        <View
                            style={{
                                paddingLeft: SIZE(16),
                                marginBottom: SIZE(24),
                            }}>
                            <View style={styles.selectedPetTextContainer}>
                                <Text style={styles.selectedPetText}>
                                    Selected Pet
                                </Text>
                            </View>
                        </View>
                        <View style={styles.breedNameContainer}>
                            <View style={styles.breedTop}>
                                <Text style={styles.nameText}>
                                    {bookingData?.breed}
                                </Text>
                                <Text style={styles.dateText}>
                                    {formattedDate3}
                                </Text>
                            </View>
                            <View style={styles.breedBottom}>
                                <LocationIcon
                                    height={SIZE(20)}
                                    width={SIZE(20)}
                                />
                                <Text style={styles.locText}>
                                    {bookingData?.location}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.bookedItemsContainer}>
                            <View style={styles.bookedItems}>
                                <BookingTopItems
                                    bookingData={bookingData}
                                    route={route}
                                />
                                <BookingFoodDetails
                                    bookingData={bookingData}
                                    route={route}
                                />
                                <BookingTopDate
                                    bookingData={bookingData}
                                    route={route}
                                />
                            </View>
                        </View>
                        {/* Payment Detail */}
                        <BookingPaymentDetail
                            bookingData={bookingData}
                            route={route}
                        />
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
                            const chatType = 'borrow_a_pet';
                            navigation.navigate('ChatInner', {
                                item: {
                                    otherUser: {
                                        id: userIdFromEmail,
                                        name: bookingData?.customer_details
                                            ?.name,
                                    },
                                },
                                userId: userId,
                                chatType: chatType,
                                profile: bookingData?.customer_details?.image,
                                provider: true,
                            });
                        }}
                        activeOpacity={0.8}
                        style={{
                            position: 'absolute',
                            bottom: SIZE(120),
                            right: SIZE(16),
                            backgroundColor: '#003459',
                            padding: SIZE(20),
                            borderRadius: 100,
                        }}>
                        <MessageIcon width={SIZE(24)} height={SIZE(24)} />
                    </TouchableOpacity>

                    {bookingData?.booking_status == 'incoming' && (
                        <View style={styles.bottomButton}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.declineButton}
                                onPress={async () => {
                                    try {
                                        const response =
                                            await ApiSectionServiceProviderBorrowSinglePageAction(
                                                state,
                                                bookingData.id,
                                                'reject',
                                            );
                                        route.params.setBookingStatus('reject');
                                        navigation.goBack();
                                    } catch (error) {
                                        console.log('Error: ', error);
                                        navigation.goBack();
                                    }
                                }}>
                                <Text style={styles.declineButtonText}>
                                    Decline
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={async () => {
                                    try {
                                        const response =
                                            await ApiSectionServiceProviderBorrowSinglePageAction(
                                                state,
                                                bookingData.id,
                                                'accept',
                                            );
                                        route.params.setBookingStatus('accept');
                                        navigation.navigate(
                                            'BookingSectionStack',
                                            {
                                                screen: 'Bookings',
                                                params: {
                                                    selectedFilter: {
                                                        id: 2,
                                                        type: 'Borrow a Pet',
                                                        page_type: 'borrow-pet',
                                                    },
                                                },
                                            },
                                        );
                                    } catch (error) {
                                        console.log('Error: ', error);
                                        navigation.goBack();
                                    }
                                }}
                                activeOpacity={0.8}
                                style={styles.acceptButton}>
                                <Text style={styles.acceptButtonText}>
                                    Accept
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}
        </>
    );
};

export default BorrowBookingSinge;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headercontainer: {
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
    },
    borrowPetText: {
        fontSize: SIZE(20),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(25),
        color: '#00171F',
    },
    headDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(5),
        alignItems: 'center',
    },
    headDetailLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    placeName: {
        marginLeft: SIZE(8),
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
        lineHeight: SIZE(17),
        color: '#242424',
    },
    headDetailRight: {},
    headDetailRightText: {
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
        lineHeight: SIZE(17),
    },
    // carosel
    caroselContainer: {
        marginTop: SIZE(16),
        paddingHorizontal: SIZE(16),
    },
    caroselItems: {
        marginRight: SIZE(16),
        paddingVertical: SIZE(16),
        paddingHorizontal: SIZE(16),
        borderColor: '#E2E2E2',
        borderWidth: 1,
        flexDirection: 'row',
        borderRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
    },
    leftImage: {
        marginRight: SIZE(16),
    },
    imageLeft: {
        width: SIZE(100),
        height: SIZE(100),
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    itemsTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemsTopText: {
        color: '#00171F',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        fontWeight: '600',
    },
    imageCount: {
        borderColor: '#E2E2E2',
        borderWidth: 1,
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(4),
        borderRadius: SIZE(64),
    },
    imageCountText: {
        color: '#242424',
        fontSize: SIZE(12),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(15),
    },
    itemBottom: {},
    itemDetail: {
        flexDirection: 'row',
    },
    itemText: {
        width: SIZE(80),
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        fontWeight: '400',
    },
    itemColon: {
        marginHorizontal: SIZE(12),
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        fontWeight: '400',
    },
    itemAns: {
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        fontWeight: '400',
    },
    // paginater
    dottContainer: {
        alignItems: 'center',
        justifyContent: 'center',
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
    //Booked Items
    selectedPetTextContainer: {
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(12),
        backgroundColor: '#fff',
        borderWidth: SIZE(1),
        borderColor: '#e2e2e2',
        borderRadius: SIZE(24),
        alignSelf: 'flex-start',
    },
    selectedPetText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    breedNameContainer: {
        paddingHorizontal: SIZE(16),
        marginBottom: SIZE(32),
    },
    breedTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SIZE(12),
    },
    nameText: {
        color: '#242424',
        fontSize: SIZE(24),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    dateText: {
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    breedBottom: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locText: {
        marginLeft: SIZE(8),
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    bookedItems: {
        paddingHorizontal: SIZE(16),
    },
    // bottom Button
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

    //top swiper styles
    topImageContainer: {
        marginBottom: SIZE(24),
        width: SIZES.width,
    },
    commonButtonContainer: {
        position: 'absolute',
        zIndex: 1000,
        padding: SIZE(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SIZES.width,
    },
    topButtonLeft: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    commonButtonMain: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZE(40),
        height: SIZE(40),
        padding: SIZE(8),
        backgroundColor: '#FFF',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(40),
    },
    commonTopButtons: {
        width: SIZE(24),
        height: SIZE(24),
    },
    topButtonRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    swiperMain: {
        flex: 1,
        overflow: 'hidden',
        width: SIZES.width,
        height: SIZE(316),
    },
    swiperSub: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    swiperNumberMain: {
        padding: SIZE(16),
        position: 'absolute',
        zIndex: 1000,
        bottom: 0,
        right: 0,
    },
    swiperNumber: {
        backgroundColor: '#fff',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(6),
        borderRadius: SIZE(61),
        width: SIZE(59),
        alignItems: 'center',
    },
    swiperNumberText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
});
