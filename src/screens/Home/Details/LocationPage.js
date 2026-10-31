import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    PermissionsAndroid,
    Platform,
    ScrollView,
    Linking,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {SIZE} from '../../../theme/theme';

// components
import DoubleColorHeading from '../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../components/headings/DescriptionHeading';
import {FONTS} from '../../../theme/fonts';

// Packages
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';

// Icons
import Location from '../../../assets/icons/location.svg';
import LocationGrey from '../../../assets/icons/locationgrey.svg';
import GpsIcon from '../../../assets/icons/gpsblue.svg';

const LocationPage = ({
    geoAddressText,
    setGeoAddressText,
    addressText,
    setAddressText,
    exactLocation,
    setExactLocation,
    errorMessage,
    setErrorMessage,
    handleLocationSubmit,
    toastRef,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isInputEmpty, setIsInputEmpty] = useState(true);
    const inputRef = useRef(null);
    const finalLocation = geoAddressText ? geoAddressText : addressText;

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
                    responseJson.results[0].address_components[1].short_name,
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
        <ScrollView
            bounces={false}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <View style={styles.locationContain}>
                <Location width={SIZE(56)} height={SIZE(56)} />
            </View>
            <DoubleColorHeading
                firstTitle={'Add Your'}
                secondTitle={'Location'}
                isCenter={true}
            />
            <DescriptionHeading text={'Please Enter Your Location'} />
            <View
                style={{
                    marginTop: SIZE(40),
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
                        const shortName = details?.name || '';
                        setExactLocation({
                            ...exactLocation,
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                        });
                        setGeoAddressText(shortName);
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
                            setErrorMessage('');
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
                                disabled={true}
                                activeOpacity={0.7}
                                onPress={() => {
                                    getLocation();
                                    setAddressText();
                                    setErrorMessage('');
                                }}>
                                {isInputEmpty && (
                                    <LocationGrey
                                        width={SIZE(24)}
                                        height={SIZE(24)}
                                    />
                                )}
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
            <TouchableOpacity
                style={styles.gpsBox}
                activeOpacity={0.8}
                disabled={isLoading}
                onPress={() => {
                    getLocation();
                }}>
                {isLoading ? (
                    <View style={{flex: 1}}>
                        <ActivityIndicator size={'small'} color={'#009fd3'} />
                    </View>
                ) : (
                    <>
                        <View>
                            <GpsIcon width={SIZE(20)} height={SIZE(20)} />
                        </View>
                        <Text style={styles.gpsText}>
                            Use my Current Location
                        </Text>
                    </>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    if (
                        exactLocation?.latitude === '' &&
                        exactLocation?.longitude === ''
                    ) {
                        setErrorMessage('Please Select Location');
                    } else {
                        handleLocationSubmit();
                    }
                }}
                style={styles.submit}
                activeOpacity={0.8}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
            {errorMessage && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
        </ScrollView>
    );
};

export default LocationPage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(32),
        borderTopRightRadius: SIZE(32),
        borderTopLeftRadius: SIZE(32),
    },
    locationContain: {
        alignItems: 'center',
        marginBottom: SIZE(16),
    },
    searchIconContainer: {
        width: SIZE(20),
        height: SIZE(20),
        position: 'absolute',
        top: SIZE(15),
        left: SIZE(15),
        zIndex: 100,
    },
    gpsBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: SIZE(25),
    },
    gpsText: {
        marginLeft: SIZE(10),
        fontSize: SIZE(14),
        color: '#009FD3',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    submit: {
        borderRadius: SIZE(8),
        padding: SIZE(14),
        backgroundColor: '#009FD3',
    },
    submitText: {
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        color: '#fff',
        textAlign: 'center',
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
});
