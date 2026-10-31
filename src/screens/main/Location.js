import {StyleSheet, View} from 'react-native';
import React from 'react';
//packages
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
// components
import MapHeader from '../../components/header/MapHeader';
//constants
import {SIZES} from '../../theme/theme';

const Location = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <View style={styles.topContainer}>
                    <MapHeader />
                </View>
                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: 25.800694,
                            longitude: 55.9762,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}></MapView>
                </View>
            </View>
        </View>
    );
};

export default Location;

const styles = StyleSheet.create({
    mapContainer: {
        // ...StyleSheet.absoluteFillObject,
        height: SIZES.height,
        width: SIZES.width,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
