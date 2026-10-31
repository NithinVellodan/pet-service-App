import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {Context} from '../../contexts/Store';

//images and logod
import NoData from '../../assets/icons/booking/no-data.svg';
import NoDataArrival from '../../assets/icons/nodataarrivals.svg';

const NoBooking = () => {
    const {state} = useContext(Context);

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <View>
                    {!state.userData.is_service ? (
                        <NoDataArrival width={SIZE(90)} height={SIZE(90)} />
                    ) : (
                        <NoData width={SIZE(90)} height={SIZE(90)} />
                    )}
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.reviews}>
                        {state.userData.is_service ? 'No Booking' : 'No Data'}
                    </Text>
                    <Text style={styles.reviewsDescription}>
                        {state.userData.is_service
                            ? 'Your booking is empty now!'
                            : 'No data, please try again later'}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default NoBooking;

const styles = StyleSheet.create({
    container: {
        padding: SIZE(24),
        backgroundColor: '#fff',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(12),
    },
    mainContainer: {
        alignItems: 'center',
    },
    bottomContainer: {
        alignItems: 'center',
        width: SIZES.width - 80,
        marginTop: SIZE(16),
    },
    reviews: {
        marginBottom: SIZE(12),
        color: '#000000',
        fontWeight: '600',
        fontSize: SIZE(14),
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
        fontSize: SIZE(12),
    },
});
