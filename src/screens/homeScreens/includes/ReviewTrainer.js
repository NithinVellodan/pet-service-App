import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

import StarIcon from '../../../assets/icons/star.svg';
import StarLight from '../../../assets/icons/starlight.svg';
import AvatarImage from '../../../assets/icons/avatar-new.svg';

const ReviewTrainer = ({item}) => {
    const start_date = item?.date_updated
        ? new Date(item.date_updated).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
          })
        : '';

    return (
        <View key={item.id} style={styles.reviewSingle}>
            <View style={styles.reviewTop}>
                <View style={styles.reviewLeft}>
                    <View
                        style={{
                            width: SIZE(40),
                            height: SIZE(40),
                            borderRadius: SIZE(100),
                            marginRight: SIZE(10),
                        }}>
                        <Image
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: SIZE(100),
                            }}
                            source={{uri: item.customer_details.image}}
                        />
                    </View>
                    <View style={styles.reviewDetails}>
                        <View style={styles.reviewName}>
                            <Text
                                allowFontScaling={false}
                                style={styles.reviewNameText}>
                                {item?.customer_details?.name}
                            </Text>
                        </View>
                        <View style={styles.starRatingContainer}>
                            {[...Array(item.rating)].map((_, index) => (
                                <StarIcon
                                    key={index}
                                    width={SIZE(16)}
                                    height={SIZE(16)}
                                />
                            ))}
                            {[...Array(5 - item.rating)].map((_, index) => (
                                <StarLight
                                    key={index}
                                    width={SIZE(16)}
                                    height={SIZE(16)}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.reviewMiddle}>
                <Text style={styles.review} allowFontScaling={false}>
                    {item.review}
                </Text>
            </View>
            <View style={styles.reviewBottom}>
                <Text style={styles.reviewDate} allowFontScaling={false}>
                    {start_date ? start_date : ''}
                </Text>
            </View>
        </View>
    );
};

export default ReviewTrainer;

const styles = StyleSheet.create({
    reviewSingle: {
        padding: SIZE(16),
        backgroundColor: '#fff',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(8),
        marginBottom: SIZE(16),
    },
    reviewTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZE(10),
    },
    reviewLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewImageContainer: {
        marginRight: SIZE(12),
        width: SIZE(40),
        height: SIZE(40),
        overflow: 'hidden',
    },
    reviewImage: {
        width: '100%',
        height: '100%',
        borderRadius: SIZE(40),
    },
    reviewName: {
        marginBottom: SIZE(4),
    },
    reviewNameText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    starRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewRight: {
        width: SIZE(24),
        height: SIZE(21),
    },
    reviewMiddle: {
        marginBottom: SIZE(8),
    },
    review: {
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    reviewDate: {
        color: '#969696',
        fontSize: SIZE(12),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
});
