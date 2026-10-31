import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NoData from '../../assets/icons/noreveiw.svg';
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

const NoReview = () => {
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <View>
                    <NoData width={SIZE(300)} height={SIZE(300)} />
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.reviews}>No Reviews</Text>
                    <Text style={styles.reviewsDescription}>
                        You Haven’t written any reviews yet. Add your first
                        review now.
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default NoReview;

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
        marginTop: SIZE(32),
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
