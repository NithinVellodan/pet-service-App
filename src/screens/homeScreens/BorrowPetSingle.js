import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
    ActivityIndicator,
    Share,
    BackHandler,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

// packages
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import {useToast} from 'react-native-toast-notifications';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {
    ApiSectionCustomerSingleBorrowPet,
    toggleWishlistPet,
} from '../main/ApiSection';
import {Context} from '../../contexts/Store';

//components
import Reviews from './includes/Reviews';
import AboutAndLocations from './includes/AboutAndLocation';
import PriceTo from './includes/PriceTo';
import CollendorSection from './includes/CollendorSection';
import Spotlight, {SectionProfile} from './includes/Spotlight';
import HealthSection from './includes/HealthContents';
import InternalServerError from '../error/InternalServerError';
import PageNotFound from '../error/PageNotFound';
import ModalScreen from '../Profile-related/ModalScreen';
import UserLogin from '../booking/includes/UserLogin';
import PetHabits from './includes/PetHabits';

//images and logos
import CalendarBlueIcon from '../../assets/icons/calendarblue.svg';
import CloseIcon from '../../assets/icons/close-icon-blue.svg';
import WishlistIconBlack from '../../assets/icons/heartblack.svg';
import ShareIcon from '../../assets/icons/share.svg';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import HeartBig from '../../assets/icons/heartbig.svg';

const BorrowPetSingle = ({is_provider, route}) => {
    const {state, dispatch} = useContext(Context);
    const toast = useToast();
    const navigation = useNavigation();
    const [singleItemPk, setSingleItemPk] = useState(route?.params?.pk);
    const [singleItem, setSingleItem] = useState();

    const [currentLat, setCurrentLat] = useState();
    const [currentSelection, setCurrentSelection] = useState();
    const [userId, setUserId] = useState(state?.userData?.firebaseUid);
    const [userIdFromEmail, setUserIdFromEmail] = useState(null);
    const [users, setUsers] = useState([]);
    const [errorStatus, setErrorStatus] = useState();

    //states
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [calModalVisible, setCalModalVisible] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userModal, setUserModal] = useState(false);
    const [isType, setType] = useState('mail');
    const [screen, setScreen] = useState(false);
    const [is_Firbase, setIs_Firbase] = useState({
        is_fireBase: false,
        email: '',
        google_id_token: '',
    });

    const [calendar, setCalendar] = useState();
    const [scrollY, setScrollY] = useState(0);
    const selected = route?.params?.selected;

    const petHabitData = [
        {
            id: 1,
            detail: singleItem?.response,
            option: `${singleItem?.name} Responds to:`,
        },
        {
            id: 2,
            detail: singleItem?.like,
            option: `${singleItem?.name}'s Likes`,
        },
        {
            id: 3,
            detail: singleItem?.worst_habit,
            option: `${singleItem?.name}'s Worst Habits`,
        },
    ];
    const petPriceData = [
        {
            id: 1,
            name: singleItem?.color,
            option: 'Color',
        },
        {
            id: 2,
            name: singleItem?.weight,
            option: 'Weight',
        },
        {
            id: 3,
            name: singleItem?.age,
            option: 'Age',
        },
    ];

    const handleScroll = event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setScrollY(offsetY);
    };

    ApiSectionCustomerSingleBorrowPet(
        singleItemPk,
        setSingleItem,
        setCurrentLat,
        setCurrentSelection,
        isLoading,
        setIsLoading,
        setErrorStatus,
    );

    const navigateToBookingSummary = () => {
        navigation.navigate('BookingSummaryBorrowPet', {
            selectedDateRange: selectedDateRange,
            setSelectedDateRange: setSelectedDateRange,
            content: {
                average_rating: singleItem?.average_rating,
                description: singleItem?.description,
                price_per_day: singleItem?.price_per_day,
                pet_breed: singleItem?.pet_breed,
                singleItemPk: singleItemPk,
                title: singleItem?.pet_breed,
                image: singleItem?.gallery?.[0]?.image,
                id: singleItemPk,
                location: singleItem?.location_data?.location,
            },
        });
    };
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
            console.log('no____match');
            dispatch({
                type: 'UPDATE_ADDITIONAL_DATA_PET_WISH',
                additionalDataPetWish: updatedData,
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
                toast.show('Cannot book your own pet', {
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
                                onPress={ShareUrl}
                                activeOpacity={0.8}
                                style={[
                                    styles.commonButtonMain,
                                    {marginRight: SIZE(16)},
                                ]}>
                                <View style={styles.commonTopButtons}>
                                    <ShareIcon width={'100%'} height={'100%'} />
                                </View>
                            </TouchableOpacity>
                            {is_provider == true ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        setEditModalVisible(true);
                                    }}
                                    activeOpacity={0.8}
                                    style={styles.commonButtonMain}>
                                    <View style={styles.commonTopButtons}>
                                        <Edit width={'100%'} height={'100%'} />
                                    </View>
                                </TouchableOpacity>
                            ) : (
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
                                    style={styles.commonButtonMain}>
                                    <View style={styles.commonTopButtons}>
                                        {state.additionalDataPetWish?.find(
                                            obj => obj?.id === singleItemPk,
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
                            )}
                        </View>
                    </View>
                    <ScrollView
                        bounces={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.subContainer}>
                        <Spotlight
                            singleItem={singleItem}
                            isBorrow={true}
                            is_customer={true}
                            images={singleItem?.gallery}
                            setEditModalVisible={setEditModalVisible}
                            navigation={navigation}
                            selectedDateRange={selectedDateRange}
                        />
                        <View style={styles.detailsSection}>
                            <CollendorSection
                                setCalModalVisible={setCalModalVisible}
                                calModalVisible={calModalVisible}
                                setCalendar={setCalendar}
                                selectedDateRange={selectedDateRange}
                                setSelectedDateRange={setSelectedDateRange}
                                id={singleItemPk}
                            />
                            <View style={styles.priceHeading}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.priceMainText}>
                                    AED {singleItem?.price_per_day}
                                    {selectedDateRange ? (
                                        <Text style={styles.priceSubText}>
                                            {' '}
                                            X{' '}
                                            {`${
                                                Math.ceil(
                                                    (selectedDateRange?.endDate -
                                                        selectedDateRange?.startDate) /
                                                        (1000 * 60 * 60 * 24),
                                                ) + 1
                                            } days`}
                                        </Text>
                                    ) : (
                                        <Text style={styles.priceSubText}>
                                            /day
                                        </Text>
                                    )}
                                </Text>
                            </View>
                            <PriceTo
                                item={petPriceData}
                                is_single_customer={true}
                            />
                            <PetHabits item={petHabitData} />
                            <SectionProfile
                                navigation={navigation}
                                singleItem={singleItem}
                                userId={userId}
                                userIdFromEmail={userIdFromEmail}
                                setUserModal={setUserModal}
                                setScreen={setScreen}
                                state={state}
                                singleItemPk={singleItemPk}
                            />
                            <HealthSection singleItem={singleItem} />
                            <AboutAndLocations
                                exactLocation={singleItem?.location_data}
                                finalLocation={singleItem?.location_name}
                                Characteristics={
                                    singleItem?.pet_characteristics
                                }
                            />
                            {singleItem?.reviews?.length > 0 && (
                                <Reviews singleItem={singleItem} />
                            )}
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
                                                singleItem?.price_per_day
                                            ).toFixed(2)}{' '}
                                            {''}
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.priceRight}>
                                            (AED {singleItem?.price_per_day} x{' '}
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
                                                {/* 16 Jan - 22 Jan 2023 */}
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
                        useNativeDriver={false}
                        onBackButtonPress={() => {
                            setModalVisible(false);
                        }}
                        onBackdropPress={() => {
                            setModalVisible(false);
                        }}
                        onRequestClose={() => {
                            setModalVisible(false);
                        }}
                        isVisible={modalVisible}
                        backdropOpacity={0.4}
                        style={styles.AccModalContainer}
                        onSwipeComplete={() => {
                            setModalVisible(false);
                        }}
                        animationInTiming={200}
                        animationOutTiming={200}>
                        {selectedFacility && (
                            <View style={styles.modalMain}>
                                <View style={styles.modalTop}>
                                    <View style={styles.modalTopLeft}>
                                        <View style={styles.facilityModalIcon}>
                                            {selectedFacility.icon}
                                        </View>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.facilityName}>
                                            {selectedFacility.name}
                                        </Text>
                                    </View>
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
                                <View style={styles.modalBottom}>
                                    <Image
                                        style={styles.modalImage}
                                        source={selectedFacility.image}
                                    />
                                </View>
                            </View>
                        )}
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

export default BorrowPetSingle;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
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
    subContainer: {
        paddingBottom: SIZE(122),
    },

    detailsSection: {
        paddingHorizontal: SIZE(16),
    },

    priceHeading: {
        marginBottom: SIZE(30),
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
