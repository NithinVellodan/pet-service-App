import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    Linking,
    Dimensions,
    Share,
    ActivityIndicator,
    BackHandler,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
// packages
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import {useToast} from 'react-native-toast-notifications';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
//images and logos
import LocationIcon from '../../assets/icons/locationblue.svg';
import StarIcon from '../../assets/icons/star.svg';
import StarDot from '../../assets/icons/map-view/starDot.svg';

import StarLight from '../../assets/icons/starlight.svg';
import CalendarIcon from '../../assets/icons/calendar.svg';
import CalendarBlueIcon from '../../assets/icons/calendarblue.svg';
import WishlistIconBlack from '../../assets/icons/heartblack.svg';
import ShareIcon from '../../assets/icons/share.svg';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import InfoIcon from '../../assets/icons/info-circle2.svg';
import MessageIcon from '../../assets/icons/message.svg';
import CloseIcon from '../../assets/icons/close-icon-blue.svg';
import HeartBig from '../../assets/icons/heartbig.svg';
import {Context} from '../../contexts/Store';
import ToolTip from '../../assets/icons/tooltip.svg';
import {
    ApiSectionCustomerSinglePlaceToStay,
    toggleWishlistStay,
} from './ApiSection';
import AvatarImage from '../../assets/icons/avatar-new.svg';
import ModalScreen from '../Profile-related/ModalScreen';
import UserLogin from '../booking/includes/UserLogin';
import CalendarBookingPlace from '../includes/calendar/CalendarBookingPlace';
import InternalServerError from '../error/InternalServerError';
import PageNotFound from '../error/PageNotFound';

const PetSingle = ({route}) => {
    const navigation = useNavigation();
    const toast = useToast();
    const {state, dispatch} = useContext(Context);
    const [singleItemPk, setSingleItemPk] = useState(route?.params?.pk);
    const [singleItem, setSingleItem] = useState();
    const [userId, setUserId] = useState(state?.userData?.firebaseUid);
    const [userIdFromEmail, setUserIdFromEmail] = useState(null);
    const [users, setUsers] = useState([]);

    //states
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [calModalVisible, setCalModalVisible] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState(null);
    const [isShow, setIsShow] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [currentLat, setCurrentLat] = useState();
    const [currentSelection, setCurrentSelection] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [tempId, setTempId] = useState(false);
    const [tempRemarks, setTempRemarks] = useState();
    const [petIndex, setPetIndex] = useState(undefined);
    const [userModal, setUserModal] = useState(false);
    const [isType, setType] = useState('mail');
    const [errorStatus, setErrorStatus] = useState();
    const [screen, setScreen] = useState(false);
    const [is_Firbase, setIs_Firbase] = useState({
        is_fireBase: false,
        email: '',
        google_id_token: '',
    });

    const selected = route?.params?.selected;

    ApiSectionCustomerSinglePlaceToStay(
        singleItemPk,
        setSingleItem,
        setCurrentLat,
        setCurrentSelection,
        setIsLoading,
        setErrorStatus,
    );

    const openMapsApp = (latitude, longitude) => {
        const url = Platform.select({
            ios: `maps://app?daddr=${latitude},${longitude}&amp;ll=`,
            android: `geo:${latitude},${longitude}?q=`,
        });

        Linking.openURL(url);
    };
    const handleScroll = event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setScrollY(offsetY);
    };

    //openModal function
    const openModal = facility => {
        setSelectedFacility(facility);
        setModalVisible(true);
    };

    const visibleFacilities =
        singleItem && singleItem.facilities
            ? showAll
                ? singleItem.facilities
                : singleItem.facilities.slice(0, 3)
            : [];

    const handleViewMore = () => {
        setShowAll(true);
    };

    const handleDateRangeSelected = (startDate, endDate) => {
        setSelectedDateRange({startDate, endDate});
    };

    const handlePress = itemId => {
        clearTimeout(timeoutId);
        setIsShow(itemId);
        const newTimeoutId = setTimeout(() => {
            setIsShow(null);
        }, 1000);
        setTimeoutId(newTimeoutId);
    };
    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        };
    }, [timeoutId]);

    const navigateToBookingSummary = () => {
        navigation.navigate('BookingSummary', {
            selectedDateRange: selectedDateRange,
            setSelectedDateRange: setSelectedDateRange,
            price_perDay: currentSelection?.price_per_day,
            currentSelection: currentSelection,
            food_price: singleItem?.pet_details?.[0]?.food_price,
            content: content,
            singleItemPk: singleItemPk,
        });
    };
    const latitude = parseFloat(currentLat?.latitude);
    const longitude = parseFloat(currentLat?.longitude);

    const content = {
        average_rating: singleItem?.average_rating || 0,
        description: singleItem?.description || '',
        price_per_day: currentSelection?.price_per_day || 0,
        title: singleItem?.title || '',
        image: singleItem?.gallery?.[0]?.image || '',
        id: singleItem ? singleItem.id : null,
        location: singleItem?.location_data?.location || '',
    };

    const wishlistAdd = async selected => {
        let user_tocken = state;
        toggleWishlistStay(selected.id, user_tocken);
        if (state.additionalData?.find(obj => obj.id === selected.id)) {
            dispatch({
                type: 'UPDATE_ADDITIONAL_DATA',
                additionalData: selected,
            });
        } else {
            let updatedData = {
                ...selected,
                is_in_wishlist: true,
            };
            console.log('no____match');
            dispatch({
                type: 'UPDATE_ADDITIONAL_DATA',
                additionalData: updatedData,
            });
        }
    };

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
            singleItem &&
            singleItem.provider_details &&
            singleItem.provider_details.email
        ) {
            const emailToFind = singleItem.provider_details.email;
            const matchedUser = users.find(user => user.mail === emailToFind);
            if (matchedUser) {
                setUserIdFromEmail(matchedUser.id);
            } else {
                setUserIdFromEmail(null);
            }
        }
    }, [singleItem, users]);

    const ShareUrl = () => {
        Share.share({
            message: singleItem.shareable_link,
        })
            .then(result => console.log(result))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        if (state.userData.is_login) {
            if (
                singleItem?.provider_details?.email === state?.userData?.mailId
            ) {
                navigation.navigate('MainHome');
                toast.show('Cannot book your own place', {
                    type: 'warning',
                });
            }
        }
    }, [
        singleItem?.provider_details?.email,
        state?.userData?.mailId,
        state.userData.is_login,
    ]);

    useEffect(() => {
        const backAction = () => {
            if (navigation.canGoBack()) {
                navigation.goBack();
            } else {
                navigation.navigate('MainDrawer');
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [navigation]);

    return (
        <>
            {isLoading ? (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    size={'large'}
                    color={'#009fd3'}
                />
            ) : errorStatus === 500 ? (
                <InternalServerError />
            ) : errorStatus === 404 ? (
                <PageNotFound />
            ) : (
                <View style={styles.mainContainer}>
                    <View
                        style={[
                            styles.commonButtonContainer,
                            {
                                backgroundColor:
                                    scrollY >=
                                    Dimensions.get('window').height * 0.35
                                        ? '#F7F7F7'
                                        : 'transparent',
                                borderBottomWidth:
                                    scrollY >=
                                    Dimensions.get('window').height * 0.35
                                        ? SIZE(1)
                                        : 0,
                                borderColor: '#d3d3d3',
                            },
                        ]}>
                        <View style={styles.topButtonLeft}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (navigation.canGoBack()) {
                                        navigation.goBack();
                                    } else {
                                        navigation.navigate('MainDrawer');
                                    }
                                }}
                                activeOpacity={0.8}
                                style={styles.commonButtonMain}>
                                <View style={styles.commonTopButtons}>
                                    <ArrowLeft width={'100%'} height={'100%'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.topButtonRight}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={ShareUrl}
                                style={[
                                    styles.commonButtonMain,
                                    {marginRight: SIZE(16)},
                                ]}>
                                <View style={styles.commonTopButtons}>
                                    <ShareIcon width={'100%'} height={'100%'} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    if (state?.userData.is_login) {
                                        wishlistAdd(selected);
                                    } else {
                                        setUserModal(true);
                                        setScreen('login');
                                    }
                                }}
                                activeOpacity={0.8}
                                style={styles.commonButtonMain}>
                                <View style={styles.commonTopButtons}>
                                    {state?.additionalData?.find(
                                        obj => obj?.id === selected?.id,
                                    ) ? (
                                        <HeartBig
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    ) : (
                                        <WishlistIconBlack
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView
                        onScroll={handleScroll}
                        bounces={false}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.subContainer}>
                        <View style={styles.topImageContainer}>
                            <SwiperFlatList
                                onChangeIndex={index =>
                                    setCurrentIndex(index.index)
                                }
                                data={singleItem?.gallery}
                                renderItem={({item}) => (
                                    <View style={styles.swiperMain}>
                                        <Image
                                            source={{uri: item.image}}
                                            style={styles.swiperSub}
                                        />
                                    </View>
                                )}
                            />
                            {singleItem?.gallery?.length > 1 ? (
                                <View style={styles.swiperNumberMain}>
                                    <View style={styles.swiperNumber}>
                                        <Text style={styles.swiperNumberText}>
                                            {currentIndex + 1}/
                                            {singleItem?.gallery?.length}
                                        </Text>
                                    </View>
                                </View>
                            ) : (
                                ''
                            )}
                        </View>
                        <View style={styles.detailsSection}>
                            <View style={styles.headingContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.headingText}>
                                    {singleItem?.title}
                                </Text>
                            </View>
                            <View style={styles.locationAndStar}>
                                <View style={styles.locationSub}>
                                    <View style={styles.locationIcon}>
                                        <LocationIcon
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    </View>
                                    <View style={styles.locationTextContainer}>
                                        <Text
                                            allowFontScaling={false}
                                            numberOfLines={2}
                                            style={styles.locationText}>
                                            {singleItem?.location_name}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.ratingContainer}>
                                    <View style={styles.starIcon}>
                                        {singleItem?.average_rating > 0 ? (
                                            <StarIcon
                                                width={'100%'}
                                                height={'100%'}
                                            />
                                        ) : (
                                            <StarDot
                                                width={'100%'}
                                                height={'100%'}
                                            />
                                        )}
                                    </View>
                                    <View style={styles.ratingTextContainer}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.ratingText}>
                                            {singleItem?.average_rating > 0
                                                ? singleItem?.average_rating
                                                : 'New'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.descriptionContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.descriptionText}>
                                    {singleItem?.description}
                                </Text>
                            </View>
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
                                        <CalendarIcon
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    </View>
                                    <View style={styles.dateTextContainer}>
                                        {selectedDateRange ? (
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.dateText}>
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
                            <View style={styles.priceMainContainer}>
                                <View style={styles.priceHeading}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.priceMainText}>
                                        AED {currentSelection?.price_per_day}
                                        <Text style={styles.priceSubText}>
                                            /day
                                        </Text>
                                    </Text>
                                </View>
                                <View style={styles.petPriceMainContainer}>
                                    {singleItem &&
                                        singleItem.pet_details &&
                                        singleItem.pet_details.map(
                                            (item, index) => {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setCurrentSelection(
                                                                item,
                                                            );
                                                        }}
                                                        activeOpacity={0.8}
                                                        key={item.id}
                                                        style={[
                                                            styles.petPriceSingleContainer,
                                                            {
                                                                borderColor:
                                                                    currentSelection?.id ===
                                                                    item.id
                                                                        ? '#98C1D9'
                                                                        : '#E2E2E2',
                                                            },
                                                        ]}>
                                                        <View
                                                            style={[
                                                                styles.petTitleContainer,
                                                                {
                                                                    backgroundColor:
                                                                        currentSelection?.id ===
                                                                        item.id
                                                                            ? '#EAF7FF'
                                                                            : '#EDEDED',
                                                                },
                                                            ]}>
                                                            <Text
                                                                allowFontScaling={
                                                                    false
                                                                }
                                                                style={
                                                                    styles.petTitle
                                                                }>
                                                                {item.name}
                                                            </Text>
                                                        </View>
                                                        <View
                                                            style={
                                                                styles.petPriceContainer
                                                            }>
                                                            <Text
                                                                allowFontScaling={
                                                                    false
                                                                }
                                                                style={
                                                                    styles.petPriceText
                                                                }>
                                                                AED{' '}
                                                                {
                                                                    item?.price_per_day
                                                                }
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                );
                                            },
                                        )}
                                </View>
                            </View>
                            <View style={styles.accommodationContainer}>
                                <View style={styles.accommodationHeading}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.commonHeadingText}>
                                        Pets can Accommodate
                                    </Text>
                                </View>
                                <View style={styles.accommodationList}>
                                    <View style={styles.accommodationSub}>
                                        <View
                                            style={
                                                styles.accommodationSubTextContainer
                                            }>
                                            <Text
                                                allowFontScaling={false}
                                                style={
                                                    styles.accommodationSubText
                                                }>
                                                Type
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                styles.accommodationSubTextContainer
                                            }>
                                            <Text
                                                allowFontScaling={false}
                                                style={[
                                                    styles.accommodationSubText,
                                                    {marginLeft: SIZE(65)},
                                                ]}>
                                                No of Pets
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                styles.accommodationSubTextContainer
                                            }>
                                            <Text
                                                allowFontScaling={false}
                                                style={[
                                                    styles.accommodationSubText,
                                                    {marginLeft: SIZE(4)},
                                                ]}>
                                                Price
                                            </Text>
                                        </View>
                                        <View style={styles.extraSpace}></View>
                                    </View>
                                    {singleItem &&
                                        singleItem.pet_details &&
                                        singleItem.pet_details.map(
                                            (item, index) => {
                                                return (
                                                    <View key={item.id}>
                                                        <View
                                                            style={[
                                                                styles.accommodationMapList,
                                                                {
                                                                    backgroundColor:
                                                                        currentSelection?.id ===
                                                                        item.id
                                                                            ? '#fff'
                                                                            : '#F7F7F7',
                                                                },
                                                            ]}>
                                                            <View
                                                                style={
                                                                    styles.accommodationType
                                                                }>
                                                                <Text
                                                                    allowFontScaling={
                                                                        false
                                                                    }
                                                                    style={
                                                                        styles.accommodationTypeText
                                                                    }>
                                                                    {item.name}
                                                                </Text>
                                                            </View>
                                                            <View
                                                                style={
                                                                    styles.accommodationType
                                                                }>
                                                                <Text
                                                                    allowFontScaling={
                                                                        false
                                                                    }
                                                                    style={[
                                                                        styles.accommodationTypeText,
                                                                        {
                                                                            textAlign:
                                                                                'center',
                                                                        },
                                                                    ]}>
                                                                    {
                                                                        item?.no_of_pets
                                                                    }
                                                                </Text>
                                                            </View>
                                                            <View
                                                                style={
                                                                    styles.accommodationType
                                                                }>
                                                                <Text
                                                                    allowFontScaling={
                                                                        false
                                                                    }
                                                                    style={
                                                                        styles.accommodationTypeText
                                                                    }>
                                                                    AED{' '}
                                                                    {
                                                                        item?.price_per_day
                                                                    }
                                                                </Text>
                                                            </View>
                                                            {item?.remarks ? (
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        handlePress(
                                                                            item.id,
                                                                        );
                                                                        setTempId(
                                                                            item.id,
                                                                        );
                                                                        setTempRemarks(
                                                                            item.remarks,
                                                                        );

                                                                        const index =
                                                                            singleItem?.pet_details?.findIndex(
                                                                                pet =>
                                                                                    pet.id ===
                                                                                    item.id,
                                                                            );

                                                                        setPetIndex(
                                                                            index,
                                                                        );
                                                                        setIsShow(
                                                                            item.id,
                                                                        );
                                                                    }}
                                                                    hitSlop={10}
                                                                    activeOpacity={
                                                                        0.8
                                                                    }
                                                                    style={
                                                                        styles.infoIcon
                                                                    }>
                                                                    <InfoIcon
                                                                        width={
                                                                            '100%'
                                                                        }
                                                                        height={
                                                                            '100%'
                                                                        }
                                                                    />
                                                                </TouchableOpacity>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </View>
                                                    </View>
                                                );
                                            },
                                        )}
                                </View>
                                {isShow === tempId && (
                                    <View
                                        style={{
                                            borderWidth: SIZE(0.6),
                                            borderColor: '#E2E2E2',
                                            position: 'absolute',
                                            right: SIZE(60),
                                            top:
                                                petIndex !== undefined
                                                    ? SIZE(
                                                          75 +
                                                              petIndex *
                                                                  SIZE(55),
                                                      )
                                                    : SIZE(75),
                                            width: SIZE(180),
                                            height: SIZE(70),
                                            zIndex: 1000,
                                            backgroundColor: '#fff',
                                            borderRadius: SIZE(8),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: SIZE(10),
                                        }}>
                                        <View
                                            style={{
                                                position: 'absolute',
                                                transform: [{rotate: '90deg'}],
                                                left: SIZE(178.5),
                                                zIndex: -100,
                                            }}>
                                            <ToolTip
                                                width={SIZE(18)}
                                                height={SIZE(18)}
                                            />
                                        </View>

                                        <Text
                                            style={{
                                                color: '#969696',
                                                fontFamily: FONTS.medium,
                                                fontSize: SIZE(12),
                                            }}>
                                            {tempRemarks}
                                        </Text>
                                    </View>
                                )}
                            </View>
                            {singleItem?.facilities &&
                                singleItem?.facilities.length > 0 && (
                                    <View style={styles.facilitiesContainer}>
                                        <View style={styles.facilitiesHeading}>
                                            <Text
                                                allowFontScaling={false}
                                                style={
                                                    styles.commonHeadingText
                                                }>
                                                Facilities
                                            </Text>
                                        </View>

                                        {visibleFacilities.map(
                                            (item, index) => {
                                                return (
                                                    <View
                                                        key={item.id}
                                                        style={[
                                                            styles.facilitiesListContainer,
                                                        ]}>
                                                        <View
                                                            style={
                                                                styles.facilitiesLeft
                                                            }>
                                                            <View
                                                                style={
                                                                    styles.facilityIcon
                                                                }>
                                                                <Image
                                                                    style={
                                                                        styles.facilityImages
                                                                    }
                                                                    source={{
                                                                        uri: item?.icon,
                                                                    }}
                                                                />
                                                            </View>
                                                            <View
                                                                style={
                                                                    styles.facilityTitle
                                                                }>
                                                                <Text
                                                                    style={
                                                                        styles.facilityTitleText
                                                                    }
                                                                    allowFontScaling={
                                                                        false
                                                                    }>
                                                                    {
                                                                        item?.title
                                                                    }
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <TouchableOpacity
                                                            onPress={() =>
                                                                openModal(item)
                                                            }
                                                            hitSlop={10}
                                                            activeOpacity={0.8}
                                                            style={
                                                                styles.infoIcon
                                                            }>
                                                            <InfoIcon
                                                                width={'100%'}
                                                                height={'100%'}
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                );
                                            },
                                        )}
                                        {singleItem?.facilities &&
                                        singleItem.facilities.length > 3 ? (
                                            <>
                                                {!showAll ? (
                                                    <TouchableOpacity
                                                        onPress={handleViewMore}
                                                        style={
                                                            styles.facilityViewMore
                                                        }
                                                        activeOpacity={0.8}>
                                                        <Text
                                                            style={
                                                                styles.facilityViewMoreText
                                                            }
                                                            allowFontScaling={
                                                                false
                                                            }>
                                                            View More
                                                        </Text>
                                                    </TouchableOpacity>
                                                ) : (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setShowAll(false);
                                                        }}
                                                        style={
                                                            styles.facilityViewMore
                                                        }
                                                        activeOpacity={0.8}>
                                                        <Text
                                                            style={
                                                                styles.facilityViewMoreText
                                                            }
                                                            allowFontScaling={
                                                                false
                                                            }>
                                                            View Less
                                                        </Text>
                                                    </TouchableOpacity>
                                                )}
                                            </>
                                        ) : null}
                                    </View>
                                )}
                            <View style={styles.sellerContainer}>
                                <View style={styles.sellerLeft}>
                                    <View style={styles.sellerProfile}>
                                        {singleItem?.provider_details?.image ? (
                                            <Image
                                                style={
                                                    styles.sellerProfileImage
                                                }
                                                source={{
                                                    uri: singleItem
                                                        ?.provider_details
                                                        ?.image,
                                                }}
                                            />
                                        ) : (
                                            <AvatarImage
                                                style={{marginRight: SIZE(12)}}
                                                width={SIZE(40)}
                                                height={SIZE(40)}
                                            />
                                        )}
                                    </View>
                                    <View style={styles.sellerDetails}>
                                        <Text
                                            numberOfLines={2}
                                            allowFontScaling={false}
                                            style={styles.sellerName}>
                                            {singleItem?.provider_details?.name}
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.sellerDescription}>
                                            I am so glad to meet you, What can i
                                            do for you? Let’s Chat
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    disabled={
                                        userIdFromEmail === null
                                            ? true
                                            : false || userId === null
                                            ? true
                                            : false
                                    }
                                    onPress={() => {
                                        if (state.userData.is_login) {
                                            const chatType = 'place_to_stay';
                                            navigation.navigate('ChatInner', {
                                                item: {
                                                    otherUser: {
                                                        id: userIdFromEmail,
                                                        name: singleItem
                                                            ?.provider_details
                                                            ?.name,
                                                    },
                                                },
                                                userId: userId,
                                                chatType: chatType,
                                                profile:
                                                    singleItem?.provider_details
                                                        ?.image,
                                                pk: singleItemPk,
                                                productName: singleItem?.title,
                                                productImage: singleItem?.image,
                                                productSubTitle:
                                                    singleItem?.description,
                                                type: 'Place',
                                            });
                                        } else {
                                            setUserModal(true);
                                            setScreen('login');
                                        }
                                    }}
                                    activeOpacity={0.8}
                                    style={styles.messageIconContainer}>
                                    <View style={styles.messageIcon}>
                                        <MessageIcon
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.aboutContainer}>
                                <View style={styles.aboutHeading}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.commonHeadingText}>
                                        About Services
                                    </Text>
                                </View>
                                <View style={styles.aboutDescription}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.aboutDescriptionText}>
                                        {singleItem?.about_services}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.locationContainer}>
                                <View style={styles.locationHeading}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.commonHeadingText}>
                                        Location
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() =>
                                        openMapsApp(latitude, longitude)
                                    }
                                    style={styles.mapSection}>
                                    <MapView
                                        zoomTapEnabled={false}
                                        zoomEnabled={false}
                                        scrollEnabled={false}
                                        provider={PROVIDER_GOOGLE}
                                        style={styles.map}
                                        region={{
                                            latitude: latitude ? latitude : 0,
                                            longitude: longitude
                                                ? longitude
                                                : 0,
                                            latitudeDelta: 0.015,
                                            longitudeDelta: 0.0121,
                                        }}></MapView>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.reviewMainContainer}>
                                {singleItem?.reviews?.length > 0 && (
                                    <View style={styles.reviewHeading}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.reviewHeadingText}>
                                            Reviews
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (
                                                    state?.userData?.is_service
                                                ) {
                                                    navigation.navigate(
                                                        'MyReviews',
                                                    );
                                                } else if (
                                                    !state.userData.is_service
                                                ) {
                                                    navigation.navigate(
                                                        'CustomerReviews',
                                                        {
                                                            reviews:
                                                                singleItem?.reviews,
                                                        },
                                                    );
                                                }
                                            }}
                                            activeOpacity={0.8}
                                            style={styles.reviewAllContainer}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.reviewAllText}>
                                                View All
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                {singleItem?.reviews &&
                                    singleItem?.reviews.map(item => {
                                        const start_date = item?.date_updated
                                            ? new Date(
                                                  item.date_updated,
                                              ).toLocaleDateString('en-GB', {
                                                  day: '2-digit',
                                                  month: 'short',
                                                  year: 'numeric',
                                              })
                                            : '';

                                        return (
                                            <View
                                                key={item.id}
                                                style={styles.reviewSingle}>
                                                <View style={styles.reviewTop}>
                                                    <View
                                                        style={
                                                            styles.reviewLeft
                                                        }>
                                                        {item?.customer_details
                                                            ?.image ? (
                                                            <View
                                                                style={
                                                                    styles.reviewImageContainer
                                                                }>
                                                                <Image
                                                                    source={{
                                                                        uri: item
                                                                            ?.customer_details
                                                                            ?.image,
                                                                    }}
                                                                    style={
                                                                        styles.reviewImage
                                                                    }
                                                                />
                                                            </View>
                                                        ) : (
                                                            <AvatarImage
                                                                style={{
                                                                    marginRight:
                                                                        SIZE(
                                                                            12,
                                                                        ),
                                                                }}
                                                                width={SIZE(40)}
                                                                height={SIZE(
                                                                    40,
                                                                )}
                                                            />
                                                        )}
                                                        <View
                                                            style={
                                                                styles.reviewDetails
                                                            }>
                                                            <View
                                                                style={
                                                                    styles.reviewName
                                                                }>
                                                                <Text
                                                                    allowFontScaling={
                                                                        false
                                                                    }
                                                                    style={
                                                                        styles.reviewNameText
                                                                    }>
                                                                    {
                                                                        item
                                                                            ?.customer_details
                                                                            ?.name
                                                                    }
                                                                </Text>
                                                            </View>
                                                            <View
                                                                style={
                                                                    styles.starRatingContainer
                                                                }>
                                                                {[
                                                                    ...Array(
                                                                        item.rating,
                                                                    ),
                                                                ].map(
                                                                    (
                                                                        _,
                                                                        index,
                                                                    ) => (
                                                                        <StarIcon
                                                                            key={
                                                                                index
                                                                            }
                                                                            width={SIZE(
                                                                                16,
                                                                            )}
                                                                            height={SIZE(
                                                                                16,
                                                                            )}
                                                                        />
                                                                    ),
                                                                )}
                                                                {[
                                                                    ...Array(
                                                                        5 -
                                                                            item.rating,
                                                                    ),
                                                                ].map(
                                                                    (
                                                                        _,
                                                                        index,
                                                                    ) => (
                                                                        <StarLight
                                                                            key={
                                                                                index
                                                                            }
                                                                            width={SIZE(
                                                                                16,
                                                                            )}
                                                                            height={SIZE(
                                                                                16,
                                                                            )}
                                                                        />
                                                                    ),
                                                                )}
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View
                                                    style={styles.reviewMiddle}>
                                                    <Text
                                                        style={styles.review}
                                                        allowFontScaling={
                                                            false
                                                        }>
                                                        {item.review}
                                                    </Text>
                                                </View>
                                                <View
                                                    style={styles.reviewBottom}>
                                                    <Text
                                                        style={
                                                            styles.reviewDate
                                                        }
                                                        allowFontScaling={
                                                            false
                                                        }>
                                                        {start_date
                                                            ? start_date
                                                            : ''}
                                                    </Text>
                                                </View>
                                            </View>
                                        );
                                    })}
                            </View>
                        </View>
                    </ScrollView>
                    {selectedDateRange?.startDate &&
                        selectedDateRange?.endDate && (
                            <View style={styles.bookNowMain}>
                                <View style={styles.bookNowLeft}>
                                    <View style={styles.leftTop}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.priceLeft}>
                                            AED{' '}
                                            {(
                                                (Math.ceil(
                                                    (selectedDateRange?.endDate -
                                                        selectedDateRange?.startDate) /
                                                        (1000 * 60 * 60 * 24),
                                                ) +
                                                    1) *
                                                currentSelection?.price_per_day
                                            ).toFixed(2)}{' '}
                                            {''}
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.priceRight}>
                                            (AED{' '}
                                            {currentSelection?.price_per_day} x{' '}
                                            {Math.ceil(
                                                (selectedDateRange?.endDate -
                                                    selectedDateRange?.startDate) /
                                                    (1000 * 60 * 60 * 24),
                                            ) + 1}
                                            )
                                        </Text>
                                    </View>
                                    <View style={styles.leftBottom}>
                                        <View style={styles.bookNowCalendar}>
                                            <CalendarBlueIcon
                                                width={'100%'}
                                                height={'100%'}
                                            />
                                        </View>
                                        <View style={styles.bookNowDate}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.dateTextOne}>
                                                {`${selectedDateRange?.startDate.getDate()} ${selectedDateRange?.startDate.toLocaleString(
                                                    'default',
                                                    {month: 'short'},
                                                )} - ${selectedDateRange?.endDate.getDate()} ${selectedDateRange?.endDate.toLocaleString(
                                                    'default',
                                                    {month: 'short'},
                                                )} ${selectedDateRange?.endDate.getFullYear()}`}{' '}
                                                <Text
                                                    style={styles.dateTextTwo}>
                                                    {`(${
                                                        Math.ceil(
                                                            (selectedDateRange?.endDate -
                                                                selectedDateRange?.startDate) /
                                                                (1000 *
                                                                    60 *
                                                                    60 *
                                                                    24),
                                                        ) + 1
                                                    } days)`}
                                                </Text>
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    onPress={navigateToBookingSummary}
                                    activeOpacity={0.8}
                                    style={styles.bookNowRight}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.bookNowText}>
                                        Book Now
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    <Modal
                        useNativeDriverForBackdrop={true}
                        onBackButtonPress={() => {
                            setModalVisible(false);
                        }}
                        onBackdropPress={() => {
                            setModalVisible(false);
                        }}
                        isVisible={modalVisible}
                        backdropOpacity={0.4}
                        style={styles.AccModalContainer}
                        propagateSwipe={true}
                        useNativeDriver={false}
                        onSwipeComplete={() => setModalVisible(false)}
                        swipeDirection={['down']}
                        animationType={'fade'}
                        animationIn={'slideInUp'}
                        animationInTiming={200}
                        animationOutTiming={200}>
                        {selectedFacility && (
                            <View style={styles.modalMain}>
                                <View
                                    style={{
                                        marginBottom: SIZE(24),
                                    }}>
                                    <View style={styles.sliderLine}></View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalVisible(false);
                                        }}
                                        activeOpacity={0.8}
                                        hitSlop={10}
                                        style={styles.closeIcon}>
                                        <CloseIcon
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.modalTop}>
                                    <View style={styles.modalTopLeft}>
                                        <View style={styles.facilityModalIcon}>
                                            <Image
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: SIZE(32),
                                                }}
                                                source={{
                                                    uri: selectedFacility?.icon,
                                                }}
                                            />
                                        </View>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.facilityName}>
                                            {selectedFacility?.title}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.modalBottom}>
                                    <Image
                                        style={styles.modalImage}
                                        source={{uri: selectedFacility?.image}}
                                    />
                                </View>
                            </View>
                        )}
                    </Modal>
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
                        onBackdropPress={() => setCalModalVisible(false)}
                        onBackButtonPress={() => setCalModalVisible(false)}
                        style={{margin: 0}}
                        propagateSwipe={true}
                        avoidKeyboard={true}>
                        <View style={styles.modalContainer}>
                            <View style={styles.barContainer}></View>
                            <CalendarBookingPlace
                                onDateRangeSelected={handleDateRangeSelected}
                                setCalModalVisible={setCalModalVisible}
                                defaultDateRange={selectedDateRange}
                                id={singleItemPk}
                                categoryId={currentSelection?.pet_type}
                                placeToStay={true}
                            />
                        </View>
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
            )}
        </>
    );
};

export default PetSingle;

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
        height: SIZE(316),
    },
    commonButtonContainer: {
        position: 'absolute',
        zIndex: 1000,
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(22),
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
        minWidth: SIZE(59),
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
    },
    locationIcon: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(8),
        marginTop: SIZE(3),
    },
    locationTextContainer: {
        width: SIZE(200),
    },
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
        marginVertical: SIZE(32),
    },
    petPriceSingleContainer: {
        width: SIZE(119),
        borderRadius: SIZE(8),
        overflow: 'hidden',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        marginRight: SIZE(16),
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
        marginTop: SIZE(32),
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
    facilityImages: {
        width: '100%',
        height: '100%',
        flex: 1,
        borderRadius: SIZE(32),
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
        marginVertical: SIZE(32),
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
        // backgroundColor: '#F1E9D7',
        overflow: 'hidden',
        borderWidth: SIZE(0.5),
        borderColor: '#E2E2E2',
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
        borderRadius: SIZE(40),
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
    bookNowLeft: {
        width: SIZE(220),
    },
    leftTop: {
        marginBottom: SIZE(10),
    },
    priceLeft: {
        color: '#242424',
        fontSize: SIZE(22),
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
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '600',
    },
    AccModalContainer: {
        screenBackgroundcolor: 'transparent',
        modalPresentationStyle: 'overCurrentContext',
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalMain: {
        padding: SIZE(20),
        backgroundColor: '#fff',
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
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
    sliderLine: {
        width: '15%',
        borderWidth: SIZE(3),
        borderColor: '#009FD3',
        borderRadius: SIZE(100),
        alignSelf: 'center',
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
        width: SIZE(15),
        height: SIZE(15),
        position: 'absolute',
        top: 0,
        right: 0,
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
