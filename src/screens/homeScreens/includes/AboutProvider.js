import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking,
    Platform,
} from 'react-native';
import React from 'react';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import PlaceIcon from '../../../assets/icons/locationplace.svg';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export const AboutProvider2 = ({
    about_services,
    finalLocation,
    exactLocation,
    route,
}) => {
    // const exactLocation = {
    //     latitude: 37.7749, // Example latitude
    //     longitude: -122.4194, // Example longitude
    // };

    const openMapsApp = (latitude, longitude) => {
        const label = finalLocation;
        const url = Platform.select({
            ios: `maps://app?daddr=${latitude},${longitude}&q=${label}`,
            android: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`,
        });

        Linking.openURL(url);
    };
    return (
        <View style={{paddingBottom: SIZE(20)}}>
            <View style={styles.aboutServices}>
                <Text allowFontScaling={false} style={styles.aboutServicesHead}>
                    About Services
                </Text>
                <Text allowFontScaling={false} style={styles.aboutServicesText}>
                    {about_services && about_services}
                </Text>
            </View>

            <View style={styles.locationSection}>
                <Text style={styles.locationSectionText}>Location</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                        openMapsApp(
                            Number(exactLocation.latitude),
                            Number(exactLocation.longitude),
                        )
                    }
                    style={styles.locationView}>
                    <MapView
                        zoomTapEnabled={false}
                        zoomEnabled={false}
                        scrollEnabled={false}
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: Number(exactLocation.latitude),
                            longitude: Number(exactLocation.longitude),
                            latitudeDelta: 0.0001,
                            longitudeDelta: 0.001,
                        }}>
                        <Marker
                            coordinate={{
                                latitude: Number(exactLocation.latitude),
                                longitude: Number(exactLocation.longitude),
                            }}
                            anchor={{x: 0.5, y: 0.5}}>
                            <View style={styles.customMarker}>
                                <PlaceIcon width={SIZE(64)} height={SIZE(64)} />
                            </View>
                        </Marker>
                    </MapView>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const AboutProvider = ({aboutService, exactLocation, finalLocation, route}) => {
    const openMapsApp = (latitude, longitude) => {
        const label = finalLocation;
        const url = Platform.select({
            ios: `maps://app?daddr=${latitude},${longitude}&q=${label}`,
            android: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`,
        });

        Linking.openURL(url);
    };
    return (
        <View style={{paddingBottom: SIZE(20)}}>
            {route?.params?.type === 'Place_ToStay' && aboutService && (
                <View style={styles.aboutServices}>
                    <Text
                        allowFontScaling={false}
                        style={styles.aboutServicesHead}>
                        About Services
                    </Text>
                    <Text
                        allowFontScaling={false}
                        style={styles.aboutServicesText}>
                        {aboutService}
                    </Text>
                </View>
            )}

            <View style={styles.locationSection}>
                <Text style={styles.locationSectionText}>Location</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                        openMapsApp(
                            Number(exactLocation.latitude),
                            Number(exactLocation.longitude),
                        )
                    }
                    style={styles.locationView}>
                    <MapView
                        zoomTapEnabled={false}
                        zoomEnabled={false}
                        scrollEnabled={false}
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: Number(exactLocation.latitude),
                            longitude: Number(exactLocation.longitude),
                            latitudeDelta: 0.0001,
                            longitudeDelta: 0.001,
                        }}>
                        <Marker
                            coordinate={{
                                latitude: Number(exactLocation.latitude),
                                longitude: Number(exactLocation.longitude),
                            }}
                            anchor={{x: 0.5, y: 0.5}}>
                            <View style={styles.customMarker}>
                                <PlaceIcon width={SIZE(64)} height={SIZE(64)} />
                            </View>
                        </Marker>
                    </MapView>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AboutProvider;

const styles = StyleSheet.create({
    aboutServices: {
        paddingVertical: SIZE(20),
    },
    aboutServicesHead: {
        color: '#242424',
        fontSize: SIZE(18),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(22),
        marginBottom: SIZE(12),
    },
    aboutServicesText: {
        color: '#757575',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(18),
    },
    locationSection: {},

    locationView: {
        height: SIZE(140),
        width: '100%',
        borderRadius: SIZE(8),
        overflow: 'hidden',
        borderWidth: SIZE(0.5),
        borderColor: '#E2E2E2',
    },
    placeBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationSectionText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(22),
        marginBottom: SIZE(12),
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    customMarker: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
