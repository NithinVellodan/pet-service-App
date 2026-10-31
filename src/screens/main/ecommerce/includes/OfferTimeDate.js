import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import CalendarIcon from '../../../../assets/icons/ecommerce/calendar.svg';
import ClockIcon from '../../../../assets/icons/ecommerce/clock.svg';
import moment from 'moment';

const OfferTimeDate = ({dateTime, balance, endDateTime}) => {
    return (
        <View style={styles.container}>
            <View style={styles.topBox}>
                {dateTime == 'date' ? (
                    <Text style={styles.head}>Offer Date</Text>
                ) : (
                    dateTime == 'time' && (
                        <Text style={styles.head}>Offer Time</Text>
                    )
                )}
            </View>
            <View style={styles.bottompBox}>
                {dateTime == 'date' ? (
                    <>
                        <CalendarIcon width={SIZE(16)} height={SIZE(16)} />
                        <Text style={styles.timeDate}>{balance}</Text>

                        {/* <ClockIcon
                            style={{marginLeft: SIZE(10)}}
                            width={SIZE(16)}
                            height={SIZE(16)}
                        /> */}
                        <Text style={styles.timeDate}>
                            {moment(endDateTime).format('hh:mm A')}
                        </Text>
                    </>
                ) : (
                    dateTime == 'time' && (
                        <>
                            <ClockIcon width={SIZE(16)} height={SIZE(16)} />
                            <Text style={styles.timeDate}>{balance}</Text>
                        </>
                    )
                )}
            </View>
        </View>
    );
};

export default OfferTimeDate;

const styles = StyleSheet.create({
    container: {
        borderRadius: SIZE(8),
        borderWidth: 1,
        borderColor: '#E2E2E2',
        overflow: 'hidden',
    },
    topBox: {
        padding: SIZE(12),
        backgroundColor: '#EDEDED',
        alignItems: 'center',
    },
    bottompBox: {
        padding: SIZE(12),
        backgroundColor: '#FFF',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    head: {
        fontSize: SIZE(14),
        lineHeight: SIZE(17),
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    timeDate: {
        marginLeft: SIZE(10),
        alignItems: 'center',
        color: '#003459',
        fontSize: SIZE(14),
        lineHeight: SIZE(22),
        fontFamily: FONTS.bold,
        letterSpacing: SIZE(0.5),
    },
});
