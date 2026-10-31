import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FONTS} from '../../../../theme/fonts';
import {SIZE} from '../../../../theme/theme';
import InfoCircle from '../../../../assets/icons/ecommerce/customer/info-circle.svg';

export default function Services() {
    const serviceData = [
        {
            id: 1,
            type: 'Cash on Delivery Available',
        },
        {
            id: 2,
            type: 'Cancellation Upto 24 hrs',
        },
        {
            id: 3,
            type: 'No Returns Allowed',
        },
    ];
    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <View style={styles.headingContainer}>
                    <Text style={styles.mainHeading}>Services</Text>
                </View>

                {serviceData.map((item, index) => (
                    <View key={item.id} style={styles.textContainer}>
                        <View>
                            <Text style={styles.descriptionText}>
                                {item.type}
                            </Text>
                        </View>
                        <View style={styles.deviceContainer}>
                            <InfoCircle width={'100%'} height={'100%'} />
                        </View>
                    </View>
                ))}
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
    },
    headingContainer: {
        borderBottomWidth: SIZE(1),
        borderColor: '#E2E2E2',
        paddingBottom: SIZE(12),
    },
    mainHeading: {
        color: '#00171F',
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
    },
    descriptionText: {
        color: '#686868',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZE(16),
        justifyContent: 'space-between',
    },
    deviceContainer: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(8),
    },
});
