import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

//constants for
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

//icons

import Devices from '../../../../assets/icons/ecommerce/customer/devices.svg';

export default function Expiry() {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.deviceContainer}>
                        <Devices width={'100%'} height={'100%'} />
                    </View>
                    <View style={styles.headingContainer}>
                        <Text style={styles.mainHeading}>Expiry </Text>
                    </View>
                    <View>
                        <Text style={styles.expiryText}>: Nov 2024</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: SIZE(16),
        marginBottom: SIZE(32),
    },

    subContainer: {
        padding: SIZE(16),
        backgroundColor: '#fff',
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
    },
    headingContainer: {},
    mainHeading: {
        color: '#00171F',
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
    },
    expiryText: {
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
    },

    deviceContainer: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(8),
    },
});
