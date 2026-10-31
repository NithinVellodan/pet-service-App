import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

const ShippingDetail = ({title, name, address, number}) => {
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Text style={styles.headText}>{title}</Text>
            </View>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.AdrressText}>{address}</Text>
            <Text style={styles.numb}>{number}</Text>
        </View>
    );
};

export default ShippingDetail;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: SIZE(8),
        padding: SIZE(16),
        backgroundColor: '#FFFFFF',
        marginBottom: SIZE(16),
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: SIZE(16),
        borderBottomWidth: 1,
        borderColor: '#E2E2E2',
    },
    headText: {
        color: '#969696',
        fontSize: SIZE(14),
        fontFamily: FONTS.medium,
        lineHeight: SIZE(17),
    },
    nameText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.medium,
        lineHeight: SIZE(17),
        marginTop: SIZE(16),
    },
    AdrressText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        marginTop: SIZE(12),
    },
    numb: {
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.medium,
        lineHeight: SIZE(17),
        marginTop: SIZE(7),
    },
});
