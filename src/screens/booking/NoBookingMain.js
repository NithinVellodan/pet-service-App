import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NoData from '../../assets/icons/booking/no-data.svg';
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

const NoBookingMain = ({page}) => {
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <View>
                    <NoData width={SIZE(300)} height={SIZE(300)} />
                </View>
                {page == 'newArrivals' ? (
                    <View style={styles.bottomContainer}>
                        <Text style={styles.reviews}>No Arrivals</Text>
                        <Text style={styles.reviewsDescription}>
                            Your Arrivals is empty now!
                        </Text>
                    </View>
                ) : (
                    <View style={styles.bottomContainer}>
                        <Text style={styles.reviews}>No Booking</Text>
                        <Text style={styles.reviewsDescription}>
                            Your booking is empty now!
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default NoBookingMain;

const styles = StyleSheet.create({
    container: {
        paddingTop: SIZE(80),
    },
    mainContainer: {
        alignItems: 'center',
    },
    bottomContainer: {
        alignItems: 'center',
        width: SIZE(300),
        marginTop: SIZE(16),
    },
    reviews: {
        marginBottom: SIZE(12),
        color: '#000000',
        fontWeight: '600',
        fontSize: SIZE(20),
        lineHeight: SIZE(25),
        textAlign: 'center',
        fontFamily: FONTS.semiBold,
    },
    reviewsDescription: {
        textAlign: 'center',
        fontFamily: FONTS.regular,
        fontWeight: '400',
        lineHeight: SIZE(20),
        color: '#686868',
        textAlign: 'center',
        fontSize: SIZE(16),
    },
});
