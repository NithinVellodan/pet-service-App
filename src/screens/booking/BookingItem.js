import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    Animated,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

// packages
import Carousel from 'react-native-reanimated-carousel';
import firestore from '@react-native-firebase/firestore';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

// Icons
import BackIcon from '../../assets/icons/profile-icons/arrow-left.svg';
import PlaceIcone from '../../assets/icons/location-icon.svg';
import CalendarIcon from '../../assets/icons/booking/calendar.svg';
import UpIcon from '../../assets/icons/arrow-up.svg';
import DownIcon from '../../assets/icons/arrow-down.svg';

import MessageIcon from '../../assets/icons/booking/message.svg';

import {
    ApiSectionServiceProviderSinglePage,
    ApiSectionServiceProviderSinglePageAction,
} from '../main/ApiSectionServiceProvider';

import {Context} from '../../contexts/Store';
import {useRoute} from '@react-navigation/native';

const BookingItem = ({route, navigation}) => {
    const {state} = useContext(Context);

    const [isVisible, setIsVisible] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [bookingData, setBookingData] = useState([]);
    const [petDetails, setPetDetails] = useState([]);
    const bookingId = route.params.item_id;
    const [formattedDate3, setFormattedDate3] = useState(null);
    const [userId, setUserId] = useState(state?.userData?.firebaseUid);
    const [userIdFromEmail, setUserIdFromEmail] = useState(null);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (bookingData && bookingData.booking_date) {
            const dateObject = new Date(bookingData.booking_date);
            const day = dateObject.getDate();
            const month = new Intl.DateTimeFormat('en-US', {
                month: 'short',
            }).format(dateObject);
            const year = dateObject.getFullYear();
            const formattedDate = `${day} ${month} ${year}`;
            setFormattedDate3(formattedDate);
        }
    }, [bookingData]);

    ApiSectionServiceProviderSinglePage(
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

    const dotsLength = petDetails.length;
    const dateObject = new Date(bookingData.start_date);
    const dateObject2 = new Date(bookingData.end_date);
    const year = dateObject.getFullYear();
    const year2 = dateObject2.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const month2 = (dateObject2.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const day2 = dateObject2.getDate().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}`;
    const formattedDate2 = `${day2}-${month2}-${year2}`;

    const renderBookItems = ({item, index}) => {
        return (
            <>
                <View style={styles.caroselItems}>
                    <View style={styles.leftImage}>
                        <Image
                            resizeMode="cover"
                            style={styles.imageLeft}
                            source={{uri: item?.image}}
                        />
                    </View>
                    <View style={styles.rightContainer}>
                        <View style={styles.itemsTop}>
                            <Text style={styles.itemsTopText}>
                                {item?.breed}
                            </Text>
                            {petDetails?.length > 1 ? (
                                <View style={styles.imageCount}>
                                    <Text style={styles.imageCountText}>
                                        {index + 1}/{petDetails?.length}
                                    </Text>
                                </View>
                            ) : (
                                ''
                            )}
                        </View>
                        <View style={styles.itemBottom}>
                            <View style={styles.itemDetail}>
                                <Text style={styles.itemText}>Age</Text>
                                <Text style={styles.itemColon}>:</Text>
                                <Text style={styles.itemAns}>{item?.age}</Text>
                            </View>
                            <View
                                style={[
                                    styles.itemDetail,
                                    {marginVertical: SIZE(4)},
                                ]}>
                                <Text style={styles.itemText}>Food</Text>
                                <Text style={styles.itemColon}>:</Text>
                                <Text style={styles.itemAns}>
                                    {item?.food_needed}
                                </Text>
                            </View>
                            <View style={styles.itemDetail}>
                                <Text style={styles.itemText}>Insurance</Text>
                                <Text style={styles.itemColon}>:</Text>
                                <Text style={styles.itemAns}>
                                    {item?.is_insured}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </>
        );
    };
    const CarousalPaginator = ({data, activeIndex}) => {
        return (
            <View style={styles.dottContainer}>
                {data.map((item, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            styles.dot,
                            {
                                backgroundColor:
                                    index === activeIndex
                                        ? '#009FD3'
                                        : '#98C1D9',
                                height:
                                    index === activeIndex ? SIZE(10) : SIZE(8),
                                width:
                                    index === activeIndex ? SIZE(10) : SIZE(8),
                                borderRadius:
                                    index === activeIndex ? SIZE(5) : SIZE(4),
                            },
                        ]}></Animated.View>
                ))}
            </View>
        );
    };

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
                    <View style={styles.headercontainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                if (route?.params?.type === 'notification') {
                                    navigation.goBack();
                                } else {
                                    navigation.navigate('Bookings', {
                                        selectedFilter: {
                                            id: 1,
                                            type: 'Place to Stay',
                                            page_type: 'place-to-stay',
                                        },
                                    });
                                }
                            }}
                            style={styles.backButton}>
                            <BackIcon />
                        </TouchableOpacity>
                        <View style={styles.headerRight}>
                            <Text style={styles.borrowPetText}>
                                {bookingData?.stay_name}
                            </Text>
                            <View style={styles.headDetail}>
                                <View style={styles.headDetailLeft}>
                                    <PlaceIcone
                                        width={SIZE(16)}
                                        height={SIZE(16)}
                                    />
                                    <Text
                                        numberOfLines={1}
                                        style={styles.placeName}>
                                        {bookingData?.location}
                                    </Text>
                                </View>
                                <View style={styles.headDetailRight}>
                                    <Text style={styles.headDetailRightText}>
                                        {formattedDate3}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <ScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: SIZE(150)}}>
                        <View style={styles.caroselContainer}>
                            <Carousel
                                panGestureHandlerProps={{
                                    activeOffsetX: [-10, 10],
                                }}
                                loop
                                width={SIZES.width - SIZE(16)}
                                height={SIZE(135)}
                                data={petDetails}
                                autoPlayInterval={1000}
                                scrollAnimationDuration={1000}
                                renderItem={renderBookItems}
                                dotsLength={dotsLength}
                                onSnapToItem={index => {
                                    setActiveIndex(index);
                                }}
                                enabled={petDetails?.length > 1}
                            />
                            {/*  */}
                            {petDetails.length > 1 && (
                                <View style={styles.paginator}>
                                    <CarousalPaginator
                                        data={petDetails}
                                        activeIndex={activeIndex}
                                    />
                                </View>
                            )}
                        </View>
                        <View style={styles.bookedItemsContainer}>
                            <View style={styles.bookedItems}>
                                <View style={styles.bookedItemsTop}>
                                    <View style={styles.bookedItemsCategory}>
                                        <Text style={styles.bookedItemGray}>
                                            {bookingData?.pet_type_name}
                                        </Text>
                                        <Text style={styles.bookedItemWhite}>
                                            Category
                                        </Text>
                                    </View>
                                    <View
                                        style={[
                                            styles.bookedItemsCategory,
                                            {marginHorizontal: SIZE(14)},
                                        ]}>
                                        <Text style={styles.bookedItemGray}>
                                            {bookingData.price_per_day}/day
                                        </Text>
                                        <Text style={styles.bookedItemWhite}>
                                            Price per Pet
                                        </Text>
                                    </View>
                                    <View style={styles.bookedItemsCategory}>
                                        <Text style={styles.bookedItemGray}>
                                            {bookingData?.no_of_pets}
                                        </Text>
                                        <Text style={styles.bookedItemWhite}>
                                            No of Pets
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.bookedItemDate}>
                                    <View style={styles.bookedItemDateGray}>
                                        <CalendarIcon
                                            width={SIZE(16)}
                                            height={SIZE(16)}
                                        />
                                        <Text style={styles.bookedDate}>
                                            {formattedDate} - {formattedDate2}
                                        </Text>
                                        <Text style={styles.bookedDays}>
                                            ( {bookingData?.no_of_days} Days )
                                        </Text>
                                    </View>
                                    <View style={styles.bookedItemDateWhite}>
                                        <Text style={styles.bookedDateText}>
                                            Booked Date
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* Payment Detail */}
                        <View style={styles.paymentSection}>
                            <View style={styles.paymentDetail}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => setIsVisible(!isVisible)}
                                    style={styles.paymentDetailHead}>
                                    <Text style={styles.paymentDetailText}>
                                        Payment Detail
                                    </Text>
                                    {isVisible ? (
                                        <UpIcon
                                            width={SIZE(24)}
                                            height={SIZE(24)}
                                        />
                                    ) : (
                                        <DownIcon
                                            width={SIZE(24)}
                                            height={SIZE(24)}
                                        />
                                    )}
                                </TouchableOpacity>
                                {isVisible && (
                                    <View style={styles.transantion}>
                                        <View
                                            style={styles.transantionIdSection}>
                                            <View
                                                style={
                                                    styles.transantionIdLeft
                                                }>
                                                <Text
                                                    style={
                                                        styles.transantionName
                                                    }>
                                                    Li************en
                                                </Text>
                                                <Text
                                                    style={
                                                        styles.transantionIdText
                                                    }>
                                                    Transaction ID
                                                </Text>
                                            </View>
                                            <Text
                                                style={
                                                    styles.transantionNumber
                                                }>
                                                #
                                                {
                                                    bookingData?.payment_details
                                                        ?.transaction_id
                                                }
                                            </Text>
                                        </View>
                                        <View style={styles.transantionItems}>
                                            <Text
                                                style={styles.transantionItem}>
                                                Food (Addon)
                                            </Text>
                                            <Text
                                                style={
                                                    styles.transantionItemCount
                                                }>
                                                AED {bookingData?.food_price}
                                            </Text>
                                        </View>
                                        <View style={styles.transantionItems}>
                                            <Text
                                                style={styles.transantionItem}>
                                                Tax (5 % VAT)
                                            </Text>
                                            <Text
                                                style={
                                                    styles.transantionItemCount
                                                }>
                                                AED {bookingData?.tax_amount}
                                            </Text>
                                        </View>
                                        <View style={styles.totalSection}>
                                            <Text style={styles.totalText}>
                                                Total
                                            </Text>
                                            <Text style={styles.totalText}>
                                                AED {bookingData?.total_amount}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            </View>
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
                            const chatType = 'place_to_stay';
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
                    {bookingData?.stay_status == 'incoming' && (
                        <View style={styles.bottomButton}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.declineButton}
                                onPress={async () => {
                                    try {
                                        const response =
                                            await ApiSectionServiceProviderSinglePageAction(
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
                                            await ApiSectionServiceProviderSinglePageAction(
                                                state,
                                                bookingData.id,
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

export default BookingItem;

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
        width: SIZE(200),
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
        borderRadius: SIZE(8),
        overflow: 'hidden',
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

    bookedItemsContainer: {
        paddingHorizontal: SIZE(16),
        marginTop: SIZE(24),
    },
    bookedItems: {
        padding: SIZE(16),
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
    },
    bookedItemsTop: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    bookedItemsCategory: {
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: SIZE(8),
    },
    bookedItemGray: {
        padding: SIZE(16),
        textAlign: 'center',
        backgroundColor: '#EDEDED',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        color: '#242424',
    },
    bookedItemWhite: {
        padding: SIZE(16),
        textAlign: 'center',
        color: '#686868',
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(17),
        fontFamily: FONTS.semiBold,
    },
    bookedItemDate: {
        borderColor: '#E2E2E2',
        borderWidth: 1,
        marginTop: SIZE(16),
        borderRadius: SIZE(8),
    },
    bookedItemDateGray: {
        flexDirection: 'row',
        backgroundColor: '#EDEDED',
        padding: SIZE(16),
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookedDate: {
        marginHorizontal: SIZE(8),
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(20),
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    bookedDays: {
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(20),
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    bookedItemDateWhite: {
        padding: SIZE(16),
        alignItems: 'center',
    },
    bookedDateText: {
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(17),
        fontFamily: FONTS.semiBold,
        color: '#686868',
    },
    // Payment Detail
    paymentSection: {
        paddingHorizontal: SIZE(16),
        marginTop: SIZE(24),
        marginBottom: SIZE(38),
    },
    paymentDetail: {
        padding: SIZE(16),
        borderWidth: 1,
        borderRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E2E2',
    },
    paymentDetailHead: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        borderColor: '#E2E2E2',
    },
    paymentDetailText: {
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(20),
        fontFamily: FONTS.semiBold,
        color: '#00171F',
    },
    transantion: {
        borderTopWidth: SIZE(1),
        paddingBottom: SIZE(16),
        marginTop: SIZE(16),
        borderColor: '#E2E2E2',
    },
    transantionIdSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: SIZE(12),
    },
    transantionIdLeft: {},
    transantionName: {
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(20),
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    transantionIdText: {
        fontSize: SIZE(14),
        fontWeight: '400',
        lineHeight: SIZE(17),
        fontFamily: FONTS.regular,
        color: '#242424',
        marginTop: SIZE(4),
    },
    transantionNumber: {
        fontSize: SIZE(14),
        fontWeight: '400',
        lineHeight: SIZE(17),
        fontFamily: FONTS.regular,
        color: '#242424',
    },
    transantionItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(12),
    },
    transantionItem: {
        fontSize: SIZE(14),
        fontWeight: '400',
        lineHeight: SIZE(17),
        fontFamily: FONTS.regular,
        color: '#969696',
    },
    transantionItemCount: {
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(17),
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    totalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(16),
        borderTopWidth: 1,
        borderColor: '#E2E2E2',
        paddingTop: SIZE(16),
    },
    totalText: {
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(20),
        fontFamily: FONTS.semiBold,
        color: '#009FD3',
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
});
