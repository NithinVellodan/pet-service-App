import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZE} from '../../theme/theme';
import UpIcon from '../../assets/icons/arrowup.svg';
import {FONTS} from '../../theme/fonts';

const BookingsingleItems = ({name, dates, noDays, noPets, onPress}) => {
    return (
        <View style={styles.container}>
            <View style={styles.mainBox}>
                <View style={styles.main}>
                    <Text allowFontScaling={false} style={styles.nameHead}>
                        {name}
                    </Text>
                    <View style={styles.rightTop}>
                        <Text allowFontScaling={false} style={styles.Date}>
                            {dates}
                        </Text>
                        <TouchableOpacity activeOpacity={0.8}>
                            <UpIcon width={SIZE(16)} height={SIZE(16)} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.itemBox}>
                    <View style={[styles.item, {marginBottom: SIZE(4)}]}>
                        <Text style={styles.firstText}>No of Days</Text>
                        <Text style={styles.Colon}>:</Text>
                        <Text style={styles.daysText}>{noDays} days</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.firstText}>No of Pets</Text>
                        <Text style={styles.Colon}>:</Text>
                        <Text style={styles.daysText}>{noPets}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={onPress}
                        activeOpacity={0.8}
                        style={styles.declineButton}>
                        <Text style={styles.declineButtonText}>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPress}
                        activeOpacity={0.8}
                        style={styles.acceptButton}>
                        <Text style={styles.acceptButtonText}>View</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default BookingsingleItems;

const styles = StyleSheet.create({
    container: {
        borderColor: '#E2E2E2',
        borderWidth: 1,
        paddingVertical: SIZE(16),
        paddingHorizontal: SIZE(16),
        borderRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
    },
    mainBox: {
        flex: 1,
    },
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nameHead: {
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        lineHeight: SIZE(20),
        color: '#00171F',
    },
    rightTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    Date: {
        color: '#757575',
        marginRight: SIZE(10),
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
        lineHeight: SIZE(17),
    },
    itemBox: {
        borderColor: '#E2E2E2',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginVertical: SIZE(16),
        paddingVertical: SIZE(16),
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    firstText: {
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
        lineHeight: SIZE(17),
        color: '#757575',
        width: SIZE(120),
    },
    Colon: {
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
        lineHeight: SIZE(17),
        color: '#757575',
        marginHorizontal: SIZE(24),
    },
    daysText: {
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
        lineHeight: SIZE(17),
        color: '#757575',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    declineButton: {
        borderWidth: 1,
        borderColor: '#009FD3',
        borderRadius: SIZE(6),
        paddingVertical: SIZE(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZE(16),
        width: SIZE(170),
    },
    declineButtonText: {
        color: '#009FD3',
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(22),
        fontFamily: FONTS.bold,
        letterSpacing: 0.5,
    },
    acceptButton: {
        backgroundColor: '#003459',
        borderWidth: 1,
        borderColor: '#003459',
        borderRadius: SIZE(6),
        paddingVertical: SIZE(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZE(16),
        width: SIZE(170),
    },
    acceptButtonText: {
        color: '#FFF',
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(22),
        fontFamily: FONTS.bold,
        letterSpacing: 0.5,
    },
});
