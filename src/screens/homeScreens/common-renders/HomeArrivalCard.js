import React, {useContext, useState} from 'react';
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';

import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import StarIcon from '../../../assets/icons/star.svg';
import StarDot from '../../../assets/icons/map-view/starDot.svg';

import HeartIconFIlled from '../../../assets/icons/heartfilled.svg';
import HeartIcon from '../../../assets/icons/heart.svg';
import {toggleWishlistPet} from '../../main/ApiSection';
import {Context} from '../../../contexts/Store';
import ModalScreen from '../../Profile-related/ModalScreen';
import UserLogin from '../../booking/includes/UserLogin';
import LocationBlack from '../../../assets/icons/locationblack.svg';

const HomeArrivalCard = React.memo(({navigation, selected}) => {
    const {state, dispatch} = useContext(Context);
    const [userModal, setUserModal] = useState(false);
    const [isType, setType] = useState('mail');
    const [screen, setScreen] = useState(false);
    const [is_Firbase, setIs_Firbase] = useState({
        is_fireBase: false,
        email: '',
        google_id_token: '',
    });

    const handlePress = async selected => {
        let user_tocken = state;
        toggleWishlistPet(selected.id, user_tocken);
        if (state.additionalDataPetWish?.find(obj => obj.id === selected.id)) {
            dispatch({
                type: 'UPDATE_ADDITIONAL_DATA_PET_WISH',
                additionalDataPetWish: selected,
            });
        } else {
            let updatedData = {
                ...selected,
                is_in_wishlist: true,
            };
            dispatch({
                type: 'UPDATE_ADDITIONAL_DATA_PET_WISH',
                additionalDataPetWish: updatedData,
            });
        }
    };

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('BorrowPetSingle', {
                    pk: selected.id,
                    selected: selected,
                });
            }}
            activeOpacity={0.8}
            style={[styles.twoItem]}>
            <View style={styles.twoImageContainer}>
                <Image source={{uri: selected.image}} style={styles.twoImage} />
            </View>
            <View style={styles.twoItemDescriptionContainer}>
                <View style={styles.twoItemTitleMain}>
                    <View style={styles.twoItemTitleContainer}>
                        <Text
                            numberOfLines={1}
                            allowFontScaling={false}
                            style={styles.twoItemTitle}>
                            {selected?.title
                                ? selected?.title
                                : selected?.pet_breed}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (state.userData.is_login) {
                                handlePress(selected);
                            } else {
                                setUserModal(true);
                                setScreen('login');
                            }
                        }}
                        activeOpacity={0.8}
                        style={styles.wishlistIconContainer}>
                        {state.additionalDataPetWish?.find(
                            obj => obj?.id === selected.id,
                        ) ? (
                            <HeartIconFIlled width={'100%'} height={'100%'} />
                        ) : (
                            <HeartIcon width={'100%'} height={'100%'} />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.locationContainer}>
                    <LocationBlack width={SIZE(12)} height={SIZE(12)} />
                    <Text
                        allowFontScaling={false}
                        numberOfLines={1}
                        style={styles.locationText}>
                        {selected?.location}
                    </Text>
                </View>

                <View style={styles.twoItemContainer}>
                    <Text
                        numberOfLines={2}
                        allowFontScaling={false}
                        style={styles.twoImageDescription}>
                        {selected.description}
                    </Text>
                </View>
                <View style={styles.twoItemBottomContainer}>
                    <View style={styles.priceContainer}>
                        <Text
                            numberOfLines={1}
                            allowFontScaling={false}
                            style={styles.priceText}>
                            AED {selected.price_per_day}
                            <Text style={{fontSize: SIZE(12)}}>/day</Text>
                        </Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <View style={styles.starContainer}>
                            {selected.average_rating > 0 ? (
                                <StarIcon width={'100%'} height={'100%'} />
                            ) : (
                                <StarDot width={'100%'} height={'100%'} />
                            )}
                        </View>
                        <View style={styles.starTextContainer}>
                            <Text
                                allowFontScaling={false}
                                style={styles.starText}>
                                {selected.average_rating > 0
                                    ? selected.average_rating
                                    : 'New'}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
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
        </TouchableOpacity>
    );
});
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(12),
        backgroundColor: '#009FD3',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: {},
    menuButton: {
        width: SIZE(32),
        height: SIZE(32),
    },
    headerRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SIZE(164),
    },
    searchContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        width: SIZE(44),
        height: SIZE(44),
        padding: SIZE(10),
        borderRadius: SIZE(22),
    },
    bellContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        width: SIZE(44),
        height: SIZE(44),
        padding: SIZE(10),
        borderRadius: SIZE(22),
    },
    profileContainer: {
        width: SIZE(44),
        height: SIZE(44),
        borderColor: '#fff',
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
        fontWeight: '600',
        fontSize: SIZE(16),
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
        // elevation: 3,
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
        backgroundColor: '#FFFFFF',
    },

    bottomImageContainer: {
        alignSelf: 'center',
    },
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
    },
    reviewsViewText: {
        color: '#003459',
        fontSize: SIZE(14),
        fontWeight: '700',
        lineHeight: SIZE(24),
        letterSpacing: 0.5,
    },

    filterContainer: {
        flexDirection: 'row',
        paddingTop: SIZE(20),
        marginBottom: SIZE(16),
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
        marginVertical: SIZE(48),
    },
    recentBookingSection: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: 10,
        padding: SIZE(16),
        marginBottom: SIZE(16),
        width: SIZES.width - SIZE(32),
    },
    recentBookingTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    recentBookingHead: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recentBookingName: {
        color: '#00171F',
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(20),
        fontFamily: FONTS.semiBold,
    },
    recentBookingStatus: {
        backgroundColor: '#CF67291A',
        color: '#F69459',
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(4),
        borderRadius: 8,
        marginRight: SIZE(16),
        fontFamily: FONTS.regular,
    },
    recentBookingData: {
        marginRight: SIZE(10),
        color: '#757575',
        fontSize: SIZE(14),
        fontWeight: '400',
        lineHeight: SIZE(16),
        fontFamily: FONTS.regular,
    },
    recentBookingMain: {
        marginTop: SIZE(30),
        // backgroundColor: 'yellow',
    },
    recentBooking: {
        paddingVertical: SIZE(10),
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#E2E2E2',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    recentImage: {
        width: SIZE(130),
        height: SIZE(140),
        marginRight: SIZE(12),
        borderRadius: 8,
    },
    recentRight: {
        justifyContent: 'center',
        width: SIZES.width * 0.5,
    },
    recentDetails: {
        flexDirection: 'row',
        marginBottom: SIZE(4),
    },
    recentDetailsCategory: {
        width: '50%',
        fontSize: SIZE(14),
        color: '#757575',
        fontFamily: FONTS.regular,
    },
    recentDott: {
        marginRight: 15,
        marginLeft: 5,
    },
    recentDetailsName: {
        fontSize: SIZE(14),
        color: '#757575',
        fontFamily: FONTS.regular,
    },
    recentLocationIcon: {
        flexDirection: 'row',
        marginVertical: SIZE(10),
        fontSize: SIZE(14),
        color: '#757575',
        fontFamily: FONTS.regular,
    },
    recentLocationName: {
        fontSize: SIZE(14),
        fontWeight: '400',
        lineHeight: SIZE(18),
        marginLeft: SIZE(4),
        color: '#757575',
        fontFamily: FONTS.regular,
    },
    recentBookingRating: {
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(20),
        color: '#00171F',
        fontFamily: FONTS.semiBold,
    },
    acceptDeclineBooking: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SIZE(16),
    },
    acceptDeclineButton: {
        borderWidth: 1,
        borderColor: '#009FD3',
        borderRadius: 6,
        paddingVertical: SIZE(10),
        paddingHorizontal: SIZE(32),
        width: SIZE(160),
    },
    acceptDeclineText: {
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(20),
        color: '#009FD3',
        textAlign: 'center',
    },
    acceptButton: {
        borderWidth: 1,
        borderColor: '#003459',
        borderRadius: 6,
        paddingVertical: SIZE(10),
        paddingHorizontal: SIZE(32),
        width: SIZE(160),
        backgroundColor: '#003459',
    },
    acceptText: {
        color: '#FFFFFF',
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(20),
        textAlign: 'center',
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
    twoImageCarousel: {
        flexDirection: 'row',
    },
    twoItem: {
        width: SIZES.width / 2.25,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        borderRadius: SIZE(12),
        marginVertical: SIZE(10),
    },
    twoImageContainer: {
        width: SIZE(190),
        height: SIZE(152),
        overflow: 'hidden',
    },
    twoImage: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    twoItemDescriptionContainer: {
        paddingVertical: SIZE(16),
        paddingHorizontal: SIZE(12),
    },
    twoItemTitleMain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    twoItemTitleContainer: {
        width: SIZE(134),
    },
    twoItemTitle: {
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        color: '#000',
    },
    wishlistIconContainer: {
        width: SIZE(28),
        height: SIZE(28),
        padding: SIZE(6),
        backgroundColor: '#EAF7FF',
        borderRadius: SIZE(50),
    },
    twoItemContainer: {
        marginVertical: SIZE(8),
    },
    locationContainer: {
        marginTop: SIZE(12),
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        color: '#242424',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        fontWeight: '400',
        marginLeft: SIZE(8),
        lineHeight: SIZE(17.5),
    },
    twoImageDescription: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#757575',
    },
    twoItemBottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceContainer: {
        width: SIZE(90),
    },
    priceText: {
        fontSize: SIZE(12),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        color: '#00171F',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(8),
        paddingVertical: SIZE(5),
        borderRadius: SIZE(30),
        backgroundColor: '#EDEDED',
    },
    starContainer: {
        width: SIZE(16),
        height: SIZE(16),
        marginRight: SIZE(6),
    },
    starTextContainer: {},
    starText: {
        fontSize: SIZE(12),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#969696',
    },
    latestOffersContainer: {},
    latestOffersTextContainer: {
        marginBottom: SIZE(16),
    },
    latestOffersText: {
        fontSize: SIZE(18),
        fontWeight: '600',
        fontFamily: FONTS.medium,
        color: '#00171F',
    },
    offerImageContainer: {
        overflow: 'hidden',
        width: '100%',
        height: SIZE(149),
        borderRadius: SIZE(12),
    },
    offerImage: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
});

export default HomeArrivalCard;
