import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import Modal from 'react-native-modal';

//images and logos
import CalendarIcon from '../../../assets/icons/calendar.svg';
import CalendarBooking from '../../includes/calendar/CalendarBooking';

const CollendorSection = ({
    setCalendar,
    selectedDateRange,
    setSelectedDateRange,
    id,
}) => {
    const [calModalVisible, setCalModalVisible] = useState(false);
    const handleDateRangeSelected = (startDate, endDate) => {
        setSelectedDateRange({startDate, endDate});
        setCalendar({startDate, endDate});
    };

    return (
        <View>
            <View style={styles.availabilityContainer}>
                <View style={styles.availabilityHeading}>
                    <Text
                        allowFontScaling={false}
                        style={styles.availabilityText}>
                        Availability
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setCalModalVisible(true);
                    }}
                    activeOpacity={0.8}
                    style={styles.calendarView}>
                    <View
                        style={[
                            styles.calendarIcon,
                            {
                                marginRight: selectedDateRange
                                    ? SIZE(70)
                                    : SIZE(100),
                            },
                        ]}>
                        <CalendarIcon width={'100%'} height={'100%'} />
                    </View>
                    <View style={styles.dateTextContainer}>
                        {selectedDateRange ? (
                            <Text
                                allowFontScaling={false}
                                style={styles.dateText}>
                                {/* 16 Jan - 22 Jan 2023 */}
                                {`${selectedDateRange.startDate.getDate()} ${selectedDateRange.startDate.toLocaleString(
                                    'default',
                                    {month: 'short'},
                                )} - ${selectedDateRange.endDate.getDate()} ${selectedDateRange.endDate.toLocaleString(
                                    'default',
                                    {month: 'short'},
                                )} ${selectedDateRange.endDate.getFullYear()}`}{' '}
                            </Text>
                        ) : (
                            <Text
                                allowFontScaling={false}
                                style={styles.dateText}>
                                Choose Date
                            </Text>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
            <Modal
                isVisible={calModalVisible}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                swipeDirection={['down']}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                onSwipeComplete={() => setCalModalVisible(false)}
                style={{margin: 0}}
                onBackdropPress={() => setCalModalVisible(false)}
                onBackButtonPress={() => setCalModalVisible(false)}
                propagateSwipe={true}
                avoidKeyboard={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.barContainer}></View>
                    <CalendarBooking
                        onDateRangeSelected={handleDateRangeSelected}
                        setCalModalVisible={setCalModalVisible}
                        defaultDateRange={selectedDateRange}
                        id={id}
                    />
                </View>
            </Modal>
        </View>
    );
};

export default CollendorSection;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    subContainer: {
        paddingBottom: SIZE(122),
    },
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
    detailsSection: {
        paddingHorizontal: SIZE(16),
    },
    headingContainer: {},
    headingText: {
        color: '#242424',
        fontSize: SIZE(24),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    locationAndStar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: SIZE(10),
    },
    locationSub: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(8),
    },
    locationTextContainer: {},
    locationText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    ratingContainer: {
        borderWidth: SIZE(1),
        borderColor: '#EDEDED',
        borderRadius: SIZE(73),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(11),
        paddingVertical: SIZE(7),
        backgroundColor: '#FFFFFF',
    },
    starIcon: {
        width: SIZE(16),
        height: SIZE(16),
        marginRight: SIZE(6),
    },
    ratingTextContainer: {},
    ratingText: {
        color: '#969696',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    descriptionContainer: {},
    descriptionText: {
        color: '#686868',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
    },
    availabilityContainer: {
        marginVertical: SIZE(24),
    },
    availabilityHeading: {
        marginBottom: SIZE(12),
    },
    availabilityText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    calendarView: {
        borderWidth: SIZE(1),
        borderColor: '#003459',
        borderRadius: SIZE(8),
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(14),
        flexDirection: 'row',
        alignItems: 'center',
    },
    calendarIcon: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(16),
    },
    dateText: {
        color: '#003459',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
        textAlign: 'center',
    },
    priceMainContainer: {},
    priceHeading: {},
    priceMainText: {
        color: '#242424',
        fontSize: SIZE(24),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    priceSubText: {
        color: '#242424',
        fontSize: SIZE(20),
        fontWeight: '500',
        fontFamily: FONTS.medium,
    },
    petPriceMainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: SIZE(32),
    },
    petPriceSingleContainer: {
        width: SIZE(119),
        borderRadius: SIZE(8),
        overflow: 'hidden',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
    },
    petTitleContainer: {
        padding: SIZE(16),
        backgroundColor: '#EDEDED',
        alignItems: 'center',
    },
    petTitle: {
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    petPriceContainer: {
        padding: SIZE(16),
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    petPriceText: {
        color: '#686868',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    accommodationContainer: {},
    accommodationHeading: {
        marginBottom: SIZE(21),
    },
    commonHeadingText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    accommodationList: {
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(8),
        overflow: 'hidden',
    },
    accommodationSub: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EDEDED',
    },
    accommodationSubTextContainer: {
        alignSelf: 'flex-start',
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
    },
    accommodationSubText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    extraSpace: {},
    accommodationMapList: {
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    accommodationType: {
        width: SIZE(118),
        padding: SIZE(16),
    },
    accommodationTypeText: {
        color: '#686868',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
        textAlign: 'left',
    },
    infoIcon: {
        alignSelf: 'center',
        width: SIZE(20),
        height: SIZE(20),
    },
    facilitiesContainer: {
        padding: SIZE(16),
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#E2E2E2',
        backgroundColor: '#FFFFFF',
        marginVertical: SIZE(32),
    },
    facilitiesHeading: {
        paddingBottom: SIZE(12),
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: SIZE(1),
        marginBottom: SIZE(16),
    },

    facilitiesListContainer: {
        paddingHorizontal: SIZE(4),
        paddingVertical: SIZE(8),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SIZE(8),
    },
    facilitiesLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    facilityIcon: {
        width: SIZE(24),
        height: SIZE(24),
        marginRight: SIZE(10),
    },
    facilityTitle: {},
    facilityTitleText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    facilityViewMore: {
        alignItems: 'center',
        marginTop: SIZE(28),
    },
    facilityViewMoreText: {
        color: '#009FD3',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '600',
    },
    sellerContainer: {
        flexDirection: 'row',
        padding: SIZE(16),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        backgroundColor: '#FFFFFF',
        borderRadius: SIZE(8),
        alignItems: 'center',
        marginBottom: SIZE(32),
    },
    sellerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sellerProfile: {
        width: SIZE(60),
        height: SIZE(60),
        marginRight: SIZE(12),
        borderRadius: SIZE(60),
        overflow: 'hidden',
    },
    sellerProfileImage: {
        width: '100%',
        height: '100%',
    },
    sellerDetails: {
        width: SIZE(224),
        marginRight: SIZE(12),
    },
    sellerName: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        marginBottom: SIZE(8),
    },
    sellerDescription: {
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    messageIconContainer: {
        width: SIZE(48),
        height: SIZE(48),
        borderRadius: SIZE(48),
        backgroundColor: '#009FD3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageIcon: {
        width: SIZE(24),
        height: SIZE(24),
    },
    aboutContainer: {
        marginBottom: SIZE(32),
    },
    aboutHeading: {
        marginBottom: SIZE(12),
    },

    aboutDescription: {},
    aboutDescriptionText: {
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    locationContainer: {
        marginBottom: SIZE(32),
    },
    locationHeading: {
        marginBottom: SIZE(16),
    },
    mapSection: {
        height: SIZE(148),
        borderRadius: SIZE(8),
        overflow: 'hidden',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    reviewMainContainer: {},
    reviewHeading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        letterSpacing: SIZE(0.5),
        marginBottom: SIZE(24),
    },
    reviewHeadingText: {
        color: '#242424',
        fontSize: SIZE(20),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    reviewAllContainer: {},
    reviewAllText: {
        color: '#009FD3',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
    },
    reviewSingle: {
        padding: SIZE(16),
        backgroundColor: '#fff',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(8),
        marginBottom: SIZE(16),
    },
    reviewTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZE(10),
    },
    reviewLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewImageContainer: {
        marginRight: SIZE(12),
        width: SIZE(40),
        height: SIZE(40),
        overflow: 'hidden',
    },
    reviewImage: {
        width: '100%',
        height: '100%',
    },
    reviewDetails: {},
    reviewName: {
        marginBottom: SIZE(4),
    },
    reviewNameText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    starRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewRight: {
        width: SIZE(24),
        height: SIZE(21),
    },
    reviewMiddle: {
        marginBottom: SIZE(8),
    },
    review: {
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    reviewBottom: {},
    reviewDate: {
        color: '#969696',
        fontSize: SIZE(12),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    bookNowMain: {
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(32),
        paddingTop: SIZE(24),
        backgroundColor: '#FFFFFF',
        borderTopWidth: SIZE(1),
        borderTopColor: '#E2E2E2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    bookNowLeft: {},
    leftTop: {
        marginBottom: SIZE(10),
    },
    priceLeft: {
        color: '#242424',
        fontSize: SIZE(24),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    priceRight: {
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    leftBottom: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bookNowCalendar: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(4),
    },
    bookNowDate: {},
    dateTextOne: {
        color: '#686868',
        fontSize: SIZE(12),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    dateTextTwo: {
        color: '#686868',
        fontSize: SIZE(12),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    bookNowRight: {
        paddingVertical: SIZE(14),
        paddingHorizontal: SIZE(32),
        backgroundColor: '#009FD3',
        borderRadius: SIZE(8),
    },
    bookNowText: {
        color: '#fff',
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        fontWeight: '600',
    },
    AccModalContainer: {
        screenBackgroundcolor: 'transparent',
        modalPresentationStyle: 'overCurrentContext',
        paddingHorizontal: SIZE(20),
    },
    modalMain: {
        padding: SIZE(16),
        backgroundColor: '#fff',
        borderRadius: SIZE(12),
    },
    modalTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZE(16),
    },
    modalTopLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    facilityModalIcon: {
        width: SIZE(32),
        height: SIZE(32),
        marginRight: SIZE(16),
    },
    facilityName: {
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    closeIcon: {
        width: SIZE(10),
        height: SIZE(10),
    },
    modalBottom: {
        borderRadius: SIZE(8),
        height: SIZE(225),
        overflow: 'hidden',
    },
    modalImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    modalContainer: {
        backgroundColor: '#F7F7F7',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(40),
    },
    barContainer: {
        backgroundColor: '#009FD3',
        width: SIZE(70),
        height: SIZE(4),
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: SIZE(16),
        marginBottom: SIZE(22),
    },
});
