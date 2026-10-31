import React, {useContext, useRef, useState} from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Alert,
    Linking,
    NativeModules,
    ScrollView,
    Platform,
} from 'react-native';

//packages
import Toast from 'react-native-toast-notifications';
import Modal from 'react-native-modal';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {Context} from '../../contexts/Store';
import CustomToast from '../../components/toast/CustomToast';

//components
import Search from '../homeScreens/includes/Search';
import LocationPage from '../Home/Details/LocationPage';

//images and logos
import BackShadow from '../../assets/icons/map-view/back-shadow.svg';
import Search1 from '../../assets/icons/map-view/search.svg';
import Filter from '../../assets/icons/filter.svg';
import SearchClose from '../../assets/icons/close-button.svg';
import EditIcon from '../../assets/icons/editgrey.svg';

const CARD_WIDTH = SIZES.width;

export const GoogleMapHeaderFilter = ({
    navigation,
    filterPage,
    header,
    locationHide,
    filter,
    bookingFilter,
    setBookingFilter,
    isSearch,
    setIsSearch,
    setSearchQuery,
    bottomSheetRef,
    setShowSectionList,
    filterData,
    setFilterData,
}) => {
    const {StatusBarManager} = NativeModules;
    const toastRef = useRef();
    const {state, dispatch} = useContext(Context);
    const [locationVisible, setLocationVisible] = useState(false);
    const [currentLocation, setCurrentLocation] = useState();
    const [addressText, setAddressText] = useState();
    const [exactLocation, setExactLocation] = useState({
        latitude: '',
        longitude: '',
    });
    const [errorMessage, setErrorMessage] = useState();

    const updateUserDate = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };

    const handleLocationSubmit = () => {
        setErrorMessage('');
        updateUserDate({
            ...state.userData,
            geoAddressText: currentLocation,
            exactLocation: exactLocation,
            locationAdded: true,
        });
        setLocationVisible(false);
    };

    return (
        <View style={{borderWidth: 0}} activeOpacity={0.8}>
            {!isSearch ? (
                <View style={styles.animatedContent}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <BackShadow width={SIZE(40)} height={SIZE(40)} />
                    </TouchableOpacity>
                    <View
                        style={[
                            styles.middleContent,
                            {
                                width:
                                    header != 'WishList' &&
                                    !state?.userData?.is_service === true
                                        ? CARD_WIDTH / 1.9
                                        : CARD_WIDTH / 1.55,
                            },
                        ]}>
                        <Text
                            allowFontScaling={false}
                            style={styles.pageHeading}>
                            {header}
                        </Text>
                        {locationHide ? null : (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    setLocationVisible(true);
                                }}
                                style={styles.locationComponent}>
                                <Text
                                    allowFontScaling={false}
                                    numberOfLines={1}
                                    style={styles.subHead}>
                                    {state?.userData?.geoAddressText
                                        ? state?.userData?.geoAddressText
                                        : 'Select Location'}
                                </Text>
                                <EditIcon height={SIZE(16)} width={SIZE(16)} />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.searchBox}>
                        <TouchableOpacity
                            onPress={() => {
                                bottomSheetRef.current.snapToIndex(2);
                                setShowSectionList(true);
                                setIsSearch(true);
                            }}
                            activeOpacity={0.8}>
                            <Search1 width={SIZE(40)} height={SIZE(40)} />
                        </TouchableOpacity>
                        {header != 'WishList' &&
                            !state?.userData?.is_service === true && (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        if (filter !== false) {
                                            if (filterData !== '') {
                                                setFilterData('');
                                            } else {
                                                filterPage();
                                            }
                                        } else if (
                                            bookingFilter === true &&
                                            header === 'Booking History'
                                        ) {
                                            setBookingFilter(prev => !prev);
                                        }
                                    }}
                                    style={[
                                        styles.rightDotContainer,
                                        {
                                            borderColor:
                                                filterData !== ''
                                                    ? '#009FD3'
                                                    : '#E2E2E2',
                                            backgroundColor:
                                                filterData !== ''
                                                    ? '#EAF7FF'
                                                    : '#fff',
                                        },
                                    ]}>
                                    <Filter
                                        width={SIZE(24)}
                                        height={SIZE(24)}
                                    />
                                </TouchableOpacity>
                            )}
                    </View>
                </View>
            ) : (
                <View style={styles.animatedContent}>
                    {isSearch ? (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                setIsSearch(false);
                                setSearchQuery('');
                            }}>
                            <SearchClose height={SIZE(40)} width={SIZE(40)} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.back}
                            onPress={() => {
                                setIsSearch(false);
                                setSearchQuery('');
                            }}
                            activeOpacity={0.8}>
                            <BackShadow height={SIZE(24)} width={SIZE(24)} />
                        </TouchableOpacity>
                    )}
                    {isSearch ? (
                        <Search setSearchQuery={setSearchQuery} />
                    ) : (
                        <View style={{marginLeft: SIZE(20)}}>
                            <Text
                                allowFontScaling={false}
                                style={styles.headerText}>
                                sijiil
                            </Text>
                        </View>
                    )}
                </View>
            )}
            <Modal
                isVisible={locationVisible}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                deviceHeight={SIZES.height}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                style={{
                    margin: 0,
                    height: '100%',
                    justifyContent: 'flex-end',
                    backgroundColor: 'transparent',
                    marginTop:
                        Platform.OS === 'ios'
                            ? StatusBarManager.HEIGHT + SIZES.height * 0.007
                            : StatusBarManager.HEIGHT - SIZE(10),
                }}
                onBackdropPress={() => {
                    setLocationVisible(false);
                }}
                onBackButtonPress={() => {
                    setLocationVisible(false);
                }}
                propagateSwipe={true}
                avoidKeyboard={true}>
                <LocationPage
                    geoAddressText={currentLocation}
                    setGeoAddressText={setCurrentLocation}
                    addressText={addressText}
                    setAddressText={setAddressText}
                    exactLocation={exactLocation}
                    setExactLocation={setExactLocation}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    handleLocationSubmit={handleLocationSubmit}
                    toastRef={toastRef}
                />
                <Toast
                    renderToast={toastOptions => {
                        return <CustomToast toastOptions={toastOptions} />;
                    }}
                    successColor="#009FD3"
                    warningColor="orange"
                    ref={toastRef}
                    duration={2000}
                    offsetBottom={SIZE(100)}
                />
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    animatedContent: {
        height: CARD_WIDTH / 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f7f7f7',
    },
    middleContent: {
        width: CARD_WIDTH / 1.9,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationComponent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pageHeading: {
        fontSize: SIZE(20),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        color: '#00171F',
        marginBottom: SIZE(8),
    },
    subHead: {
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
        color: '#00171F',
        marginRight: SIZE(8),
        lineHeight: SIZE(17.5),
    },
    rightDotContainer: {
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(40),
        backgroundColor: '#FFFFFF',
        height: SIZE(40),
        width: SIZE(40),
        marginLeft: SIZE(10),
    },
});

export default GoogleMapHeaderFilter;
