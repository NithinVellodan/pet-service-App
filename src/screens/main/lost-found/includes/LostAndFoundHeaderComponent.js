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
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {Context} from '../../../../contexts/Store';
import CustomToast from '../../../../components/toast/CustomToast';

//components
// import LocationPage from '../Home/Details/LocationPage';

//images and logos
import BackShadow from '../../../../assets/icons/map-view/back-shadow.svg';
import Search1 from '../../../../assets/icons/map-view/search.svg';
import Filter from '../../../../assets/icons/filter.svg';
import PlusButton from '../../../../assets/icons/plus-button.svg';
import SearchClose from '../../../../assets/icons/close-button.svg';
import EditIcon from '../../../../assets/icons/editgrey.svg';
import LocationPage from '../../../Home/Details/LocationPage';

const CARD_WIDTH = SIZES.width;

const LostAndFoundHeaderComponent = ({
    navigation,
    setModalVisible,
    setModalVisibleFilter,
    locationHide,
    navigate,
}) => {
    const [navigate1, setNavigate1] = useState(navigate);
    const {state, dispatch} = useContext(Context);
    const toastRef = useRef();
    const [locationVisible, setLocationVisible] = useState(false);
    const {StatusBarManager} = NativeModules;
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
        <View activeOpacity={0.8}>
            <View style={styles.animatedContent}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <BackShadow width={SIZE(40)} height={SIZE(40)} />
                </TouchableOpacity>
                <View style={[styles.middleContent]}>
                    <Text allowFontScaling={false} style={styles.pageHeading}>
                        Lost & Found
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
                            setModalVisible(true);
                        }}
                        activeOpacity={0.8}>
                        <PlusButton width={SIZE(40)} height={SIZE(40)} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginLeft: SIZE(10),
                        }}
                        onPress={() => {}}
                        activeOpacity={0.8}>
                        <Search1 width={SIZE(40)} height={SIZE(40)} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setModalVisibleFilter(true);
                        }}
                        style={[styles.rightDotContainer]}>
                        <Filter width={SIZE(24)} height={SIZE(24)} />
                    </TouchableOpacity>
                </View>
            </View>
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
        paddingHorizontal: SIZE(16),
        borderBottomWidth: SIZE(1),
        borderBlockColor: '#dedede',
        width: SIZES.width,
    },
    middleContent: {
        width: CARD_WIDTH / 2.3,
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

export default LostAndFoundHeaderComponent;
