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
import React, {useState} from 'react';

// packages
import Carousel from 'react-native-reanimated-carousel';
import {useRoute} from '@react-navigation/native';

//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import {CustomerAllBookingSingle} from '../../main/ApiSection';

//components
import InternalServerError from '../../error/InternalServerError';
import PageNotFound from '../../error/PageNotFound';

// Icons
import BackIcon from '../../../assets/icons/profile-icons/arrow-left.svg';
import CalendarIcon from '../../../assets/icons/booking/calendar.svg';
import UpIcon from '../../../assets/icons/arrow-up.svg';
import DownIcon from '../../../assets/icons/arrow-down.svg';

const CustomerBookingPlace = ({route, navigation}) => {
    const [petDetails, setPetDetails] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState();
    const [isVisible, setIsVisible] = useState(true);
    const [itemPk, setItemPk] = useState(
        route?.params?.type === 'notification'
            ? route?.params?.item?.redirect_pk
            : route?.params?.item?.id,
    );
    const [bookingData, setBookingData] = useState(
        route?.params?.type === 'notification'
            ? route?.params?.item?.redirect_pk
            : route?.params?.item?.id,
    );
    const status = route.params.item;

    CustomerAllBookingSingle(
        itemPk,
        setBookingData,
        setPetDetails,
        setIsLoading,
        setErrorStatus,
    );

    const formatDate = endDate => {
        const formattedDate = new Date(endDate);
        const day = formattedDate.getDate();
        const month = formattedDate.toLocaleString('default', {month: 'short'});
        const year = formattedDate.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const formattedStartDate = formatDate(bookingData?.start_date);
    const formattedEndDate = formatDate(bookingData?.end_date);

    const BookingItems = [
        {
            id: 1,
            name: 'Rottweiler',
            image: require('../../../assets/images/rott.png'),
        },
        {
            id: 2,
            name: 'Rottweiler2',
            image: require('../../../assets/images/image6.png'),
        },
        {
            id: 3,
            name: 'Rottweiler3',
            image: require('../../../assets/images/rott.png'),
        },
        {
            id: 4,
            name: 'Rottweiler4',
            image: require('../../../assets/images/rott.png'),
        },
        {
            id: 5,
            name: 'Rottweiler5',
            image: require('../../../assets/images/image7.png'),
        },
    ];
    const dotsLength = BookingItems.length;

    const renderBookItems = ({item, index}) => {
        return (
            <>
                <View style={styles.caroselItems}>
                    <View style={styles.leftImage}>
                        <Image
                            resizeMode="cover"
                            style={styles.imageLeft}
                            source={{uri: item.image}}
                        />
                    </View>
                    <View style={styles.rightContainer}>
                        <View style={styles.itemsTop}>
                            <Text style={styles.itemsTopText}>
                                {item?.breed}
                            </Text>
                            {petDetails.length > 1 ? (
                                <View style={styles.imageCount}>
                                    <Text style={styles.imageCountText}>
                                        {index + 1}/{petDetails.length}
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
                {/* ))} */}
            </>
        );
    };
    // carosal Dott
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

    // Status
    const getStatusStyles = item => {
        let borderColor, backgroundColor;
        switch (item?.stay_status || item?.status) {
            case 'accepted':
                borderColor = '#0BBE49';
                backgroundColor = '#0BBE491A';
                break;
            case 'incoming':
                borderColor = '#EBA900';
                backgroundColor = '#EBA9001A';
                break;
            case 'ongoing':
                borderColor = '#F69459';
                backgroundColor = '#CF67291A';
                break;
            case 'expired':
                borderColor = '#7F3C00';
                backgroundColor = '#7F3C001A';
                break;
            case 'rejected':
                borderColor = '#CF2929';
                backgroundColor = '#CF29291A';
                break;
            default:
                borderColor = 'black';
                backgroundColor = 'white';
                break;
        }

        return {borderColor, backgroundColor};
    };
    const {borderColor, backgroundColor} = getStatusStyles(status);

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
            ) : errorStatus === 500 ? (
                <InternalServerError />
            ) : errorStatus === 404 ? (
                <PageNotFound />
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
                                    <Text
                                        numberOfLines={1}
                                        style={styles.placeName}>
                                        {bookingData?.location}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.headDetailRight,
                                        {backgroundColor: backgroundColor},
                                    ]}>
                                    {bookingData?.stay_status ? (
                                        <Text
                                            style={[
                                                styles.headDetailRightText,
                                                {color: borderColor},
                                            ]}>
                                            {bookingData?.stay_status ===
                                            'incoming'
                                                ? 'Pending'
                                                : bookingData?.stay_status
                                                      ?.charAt(0)
                                                      .toUpperCase() +
                                                  bookingData?.stay_status?.slice(
                                                      1,
                                                  )}
                                        </Text>
                                    ) : null}
                                </View>
                            </View>
                        </View>
                    </View>
                    <ScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: SIZE(30)}}>
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
                                enabled={petDetails.length > 1}
                            />
                            {petDetails.length > 1 ? (
                                <View style={styles.paginator}>
                                    <CarousalPaginator
                                        data={petDetails}
                                        activeIndex={activeIndex}
                                    />
                                </View>
                            ) : null}
                        </View>
                        <View style={styles.bookedItemsContainer}>
                            <View style={styles.bookedItems}>
                                <View style={styles.bookedItemsTop}>
                                    <View style={styles.bookedItemsCategory}>
                                        <Text style={styles.bookedItemGray}>
                                            {bookingData?.pet_type}
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
                                            {bookingData?.price_per_day}/day
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
                                            {formattedStartDate} -{' '}
                                            {formattedEndDate}
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
                                        <View style={styles.transantionItems}>
                                            <Text
                                                style={styles.transantionItem}>
                                                Subtotal
                                            </Text>
                                            <Text
                                                style={
                                                    styles.transantionItemCount
                                                }>
                                                AED {bookingData?.sub_total}
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
                </View>
            )}
        </>
    );
};

export default CustomerBookingPlace;

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
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
        lineHeight: SIZE(17),
        color: '#242424',
        width: SIZE(200),
    },
    headDetailRight: {
        paddingHorizontal: SIZE(12),
        borderRadius: SIZE(4),
        paddingVertical: SIZE(4),
    },
    headDetailRightText: {
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
        lineHeight: SIZE(17),
    },
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
    paymentSection: {
        paddingHorizontal: SIZE(16),
        marginTop: SIZE(24),
    },
    paymentDetail: {
        padding: SIZE(16),
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
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
});
