import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

const BookList = ({
    name,
    status,
    bookedDate,
    noOfDays,
    Aed,
    agoDays,
    image,
    onPress,
}) => {
    return (
        <TouchableOpacity
            onPress={() => {
                onPress && onPress();
            }}
            style={styles.container}>
            <View style={styles.imageBox}>
                <Image source={image} />
            </View>
            <View style={styles.rightBox}>
                <View style={styles.topContainer}>
                    <Text style={styles.nameTop}>{name}</Text>
                    <Text
                        style={{
                            ...styles.statusTop,
                            color:
                                status === 'Ongoing'
                                    ? '#F69459'
                                    : status === 'Cancelled'
                                    ? '#CF2929'
                                    : '#0BBE49',
                            backgroundColor:
                                status === 'Ongoing'
                                    ? '#CF67291A'
                                    : status === 'Cancelled'
                                    ? '#CF29291A'
                                    : '#0BBE491A',
                        }}>
                        {status}
                    </Text>
                </View>
                <View style={styles.centerBox}>
                    <Text style={styles.leftItem}>Booked Date</Text>
                    <Text style={styles.colom}>:</Text>
                    <Text style={styles.rightItem}>{bookedDate}</Text>
                </View>
                <View style={styles.centerBox}>
                    <Text style={styles.leftItem}>No of Days</Text>
                    <Text style={styles.colom}>:</Text>
                    <Text style={styles.rightItem}>{noOfDays}</Text>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.rateText}>AED {Aed}</Text>
                    <Text style={styles.daysText}>{agoDays}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default BookList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderRadius: SIZE(8),
        marginBottom: SIZE(16),
    },
    imageBox: {
        height: SIZE(123),
        width: SIZE(120),
        overflow: 'hidden',
        borderTopLeftRadius: SIZE(8),
        borderBottomLeftRadius: SIZE(8),
    },
    rightBox: {
        padding: SIZE(12),
        flex: 1,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZE(8),
        alignItems: 'center',
    },
    nameTop: {
        color: '#00171F',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
    },
    statusTop: {
        // color: '#F69459',
        fontSize: SIZE(12),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(15),
        paddingVertical: SIZE(4),
        paddingHorizontal: SIZE(12),
        // backgroundColor: '#CF67291A',
        borderRadius: SIZE(4),
    },
    centerBox: {
        flexDirection: 'row',
        marginBottom: SIZE(4),
        alignItems: 'center',
    },
    leftItem: {
        width: SIZE(100),
        color: '#757575',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
    },
    colom: {
        marginHorizontal: SIZE(12),
        color: '#757575',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
    },
    rightItem: {
        color: '#757575',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SIZE(6),
    },
    rateText: {
        color: '#00171F',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
    },
    daysText: {
        color: '#969696',
        fontSize: SIZE(12),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(15),
    },
});
