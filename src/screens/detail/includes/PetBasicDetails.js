import React, {useState, useRef, useEffect, useContext} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    PermissionsAndroid,
    ActivityIndicator,
    NativeModules,
    Platform,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';

import {SIZE, SIZES} from '../../../theme/theme';
import Modal from 'react-native-modal';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {FONTS} from '../../../theme/fonts';
import GpsIcon from '../../../assets/icons/gps.svg';
import {Linking} from 'react-native';
import GpsIconBlue from '../../../assets/icons/gpsblue.svg';

import {Context} from '../../../contexts/Store';

const PetBasicDetails = ({
    setGeoAddressText,
    setAddressText,
    setExactLocation,
    exactLocation,
    errorMessage,
    finalLocation,
    setErrorMessage,
    setErrorMessagePlace,
    toastRef,
    picklocation,
}) => {
    const inputRef = useRef(null);

    const [isInputEmpty, setIsInputEmpty] = useState(true);
    const [isLoading, setIsLoading] = useState();
    const {state} = useContext(Context);
    const [region, setRegion] = useState({});
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [mapModalVisible, setMapModalVisible] = useState(false);
    const {StatusBarManager} = NativeModules;
    const _map = useRef(null);
    const LATITUDE_DELTA = 1;
    const LONGITUDE_DELTA = 1;

    //default location pre setting
    useEffect(() => {
        if (state.userData.exactLocation) {
            setRegion({
                latitude: state.userData.exactLocation.latitude,
                longitude: state.userData.exactLocation.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            });
        }
    }, [state.userData.exactLocation]);
    //location marking
    const handleMapPress = event => {
        const {coordinate} = event.nativeEvent;
        setSelectedLocation(coordinate);
    };

    const getExactLocation = (myLat, myLon) => {
        fetch(
            'https://maps.googleapis.com/maps/api/geocode/json?address=' +
                myLat +
                ',' +
                myLon +
                '&key=' +
                'AIzaSyBqJ4ZZH7Ieb7hiQCQpEg3I2zDFi_f7c-A',
        )
            .then(response => response.json())
            .then(responseJson => {
                const results = responseJson.results[0];
                const {lat, lng} = results.geometry.location;

                setGeoAddressText(
                    results.formatted_address.split(',').slice(0, 2).join(', '),
                );
                setExactLocation({
                    ...exactLocation,
                    latitude: lat,
                    longitude: lng,
                });
                setIsLoading(false);
            });
    };

    const getLocation = async () => {
        setIsLoading(true);
        if (Platform.OS === 'ios') {
            Geolocation.getCurrentPosition(
                position => {
                    const {latitude, longitude} = position.coords;
                    getExactLocation(latitude, longitude);
                    setIsLoading(false);
                },
                error => {
                    console.log('GetCurrentPosition Error:', error);
                    setIsLoading(false);
                    if (error.code === error.PERMISSION_DENIED) {
                        Linking.openSettings();
                    } else {
                        toastRef.current.show('Please Turn On GPS', {
                            type: 'danger',
                        });
                        console.log('Error:', error.message);
                    }
                },
                {enableHighAccuracy: true},
            );
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This app needs to access your location',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition(
                        position => {
                            const {latitude, longitude} = position.coords;

                            getExactLocation(latitude, longitude);
                            setIsLoading(false);
                        },
                        error => {
                            console.log(
                                'Android Location Error:',
                                error.code,
                                error.message,
                            );
                            setIsLoading(false);
                            toastRef.current.show('Please Turn On GPS', {
                                type: 'danger',
                            });
                        },
                        {
                            enableHighAccuracy: true,
                        },
                    );
                } else {
                    console.log('Location permission denied on Android');
                    Linking.openSettings();
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(
                    'Error while requesting location permission on Android:',
                    error,
                );
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <View>
                <View style={{marginBottom: SIZE(8), marginTop: SIZE(30)}}>
                    <Text
                        style={{
                            fontFamily: FONTS.medium,
                            fontSize: SIZE(16),
                            color: '#686868',
                        }}>
                        Location
                    </Text>
                </View>
                <View
                    style={{
                        borderWidth: SIZE(1),
                        borderRadius: SIZE(8),
                        borderColor: !isInputEmpty ? '#009FD3' : '#D3D3D3',
                        flexDirection: 'row',
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}>
                    <GooglePlacesAutocomplete
                        debounce={300}
                        disableScroll
                        ref={inputRef}
                        enablePoweredByContainer={false}
                        onPress={(data, details = null) => {
                            const addressParts = details.formatted_address
                                .split(',')
                                .map(part => part.trim());

                            const desiredAddress = addressParts
                                .slice(0, 2)
                                .join(', ');

                            setExactLocation({
                                ...exactLocation,
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                            });
                            setGeoAddressText(desiredAddress);
                        }}
                        query={{
                            key: 'AIzaSyBqJ4ZZH7Ieb7hiQCQpEg3I2zDFi_f7c-A',
                            language: 'en',
                        }}
                        textInputProps={{
                            placeholderTextColor: '#8E8E8E',
                            value: finalLocation,
                            maxLength: 37,
                            numberOfLines: 2,
                            onChangeText: text => {
                                setAddressText(text);
                            },
                            onChange: text => {
                                setGeoAddressText();
                                setExactLocation();
                                setErrorMessage &&
                                    setErrorMessage(prev => ({
                                        ...prev,
                                        location_is: false,
                                    }));
                                setErrorMessagePlace &&
                                    setErrorMessagePlace({});
                            },
                            onFocus: () => {
                                setIsInputEmpty(false);
                            },
                            onBlur: () => {
                                setIsInputEmpty(true);
                            },
                        }}
                        listKeyboardAvoidingViewDisplayed={false}
                        placeholder="Enter Location"
                        minLength={2}
                        autoFocus={true}
                        returnKeyType={'done'}
                        fetchDetails={true}
                        styles={{
                            textInputContainer: {
                                flex: 1,
                                borderRadius: SIZE(8),
                                height: SIZE(50),
                            },

                            textInput: {
                                borderRadius: SIZE(8),
                                color: '#242424',
                                fontSize: SIZE(14),
                                fontFamily: FONTS.regular,
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#F7F7F7',
                                justifyContent: 'space-between',
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                            },
                            row: {
                                backgroundColor: '#fff',
                                padding: SIZE(13),
                                flexDirection: 'row',
                                marginBottom: SIZE(2),
                            },
                            separator: {
                                height: 0,
                                backgroundColor: '#fff',
                            },
                            description: {
                                fontFamily: FONTS.regular,
                                fontSize: SIZE(14),
                                color: 'black',
                            },
                        }}
                    />
                    {isInputEmpty && (
                        <View style={{marginRight: SIZE(10)}}>
                            {isLoading ? (
                                <ActivityIndicator
                                    size={'small'}
                                    color={'#009fd3'}
                                />
                            ) : (
                                <TouchableOpacity
                                    disabled={isLoading}
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        getLocation();
                                        setAddressText();
                                        setErrorMessage &&
                                            setErrorMessage(prev => ({
                                                ...prev,
                                                location_is: false,
                                            }));
                                        setErrorMessagePlace &&
                                            setErrorMessagePlace({});
                                    }}>
                                    {isInputEmpty && (
                                        <GpsIcon width={21} height={21} />
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>
            </View>
            {picklocation && (
                <>
                    <TouchableOpacity
                        style={styles.gpsBox}
                        activeOpacity={0.8}
                        disabled={isLoading}
                        onPress={() => {
                            setMapModalVisible(true);
                        }}>
                        {isLoading ? (
                            <View style={{flex: 1}}>
                                <ActivityIndicator
                                    size={'small'}
                                    color={'#009fd3'}
                                />
                            </View>
                        ) : (
                            <>
                                <View>
                                    <GpsIconBlue
                                        width={SIZE(20)}
                                        height={SIZE(20)}
                                    />
                                </View>
                                <Text style={styles.gpsText}>
                                    Pick Your Location
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                    <Modal
                        isVisible={mapModalVisible}
                        onBackButtonPress={() => {
                            setMapModalVisible(false);
                        }}
                        onBackdropPress={() => {
                            setMapModalVisible(false);
                        }}
                        animationInTiming={400}
                        animationOutTiming={400}
                        animationIn={'slideInUp'}
                        backdropOpacity={0.2}
                        useNativeDriver={false}
                        useNativeDriverForBackdrop={true}
                        deviceHeight={SIZES.height}
                        onSwipeComplete={() => {
                            setMapModalVisible(false);
                        }}
                        style={[
                            styles.modalContainer,
                            {
                                screenBackgroundcolor: 'transparent',
                                modalPresentationStyle: 'overCurrentContext',
                                backgroundColor: '#F7F7F7',
                                marginTop:
                                    Platform.OS === 'ios'
                                        ? StatusBarManager.HEIGHT +
                                          SIZES.height * 0.04
                                        : StatusBarManager.HEIGHT,
                            },
                        ]}>
                        <View>
                            <MapView
                                ref={_map}
                                provider={PROVIDER_GOOGLE}
                                style={styles.container}
                                showsUserLocation={true}
                                showsMyLocationButton
                                followsUserLocation={true}
                                onPress={handleMapPress}
                                region={
                                    region &&
                                    region.latitude &&
                                    region.longitude
                                        ? region
                                        : {
                                              latitude: 11.2587531,
                                              longitude: 75.78041,
                                              latitudeDelta: 1.5,
                                              longitudeDelta: 1.2,
                                          }
                                }>
                                {selectedLocation && (
                                    <Marker coordinate={selectedLocation} />
                                )}
                            </MapView>
                            <TouchableOpacity
                                disabled={!selectedLocation}
                                onPress={() => {
                                    getExactLocation(
                                        selectedLocation.latitude,
                                        selectedLocation.longitude,
                                    );
                                    setMapModalVisible(false);
                                }}
                                activeOpacity={0.8}
                                style={[
                                    styles.selectMap,
                                    {opacity: selectedLocation ? 1 : 0.4},
                                ]}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.mapText}>
                                    Share Location
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </>
            )}
            {errorMessage.location_is == true && (
                <Text
                    style={[
                        styles.errorMessage,
                        {marginTop: picklocation ? SIZE(20) : SIZE(5)},
                    ]}>
                    Please select a location
                </Text>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
    modalContainer: {
        margin: 0,
        width: '100%',
        justifyContent: 'flex-end',
        borderTopRightRadius: SIZE(32),
        borderTopLeftRadius: SIZE(32),
        overflow: 'hidden',
    },
    gpsBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZE(15),
        // marginBottom: SIZE(-15),
    },
    gpsText: {
        marginLeft: SIZE(10),
        fontSize: SIZE(14),
        color: '#009FD3',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    container: {
        backgroundColor: '#fff',
        height: SIZES.height,
    },
    selectMap: {
        position: 'absolute',
        bottom: SIZE(40),
        left: SIZES.width / 4.9,
        backgroundColor: '#009FD3',
        borderRadius: SIZE(40),
        height: SIZE(50),
        width: SIZE(250),
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapText: {
        color: '#fff',
        marginRight: SIZE(12),
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
});

export default PetBasicDetails;
