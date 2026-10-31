import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import StarIcon from '../../../../assets/icons/star.svg';
//svg
import MenuIcon from '../../../../assets/icons/dott.svg';

const EcomReview = ({reviews}) => {
    const formatDate = dateString => {
        const date = new Date(dateString);
        const day = date.getUTCDate();
        const month = date.toLocaleString('default', {month: 'short'});
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <View>
            <View style={styles.reviewHeading}>
                <Text allowFontScaling={false} style={styles.reviewHeadingText}>
                    Review
                </Text>
                <TouchableOpacity
                    onPress={() => {}}
                    activeOpacity={0.8}
                    style={styles.reviewAllContainer}>
                    <Text allowFontScaling={false} style={styles.reviewAllText}>
                        View All
                    </Text>
                </TouchableOpacity>
            </View>
            {reviews?.map(item => {
                const formattedDate = formatDate(item?.date_updated);

                return (
                    <View key={item.id} style={styles.ecomReviewingle}>
                        <View style={styles.reviewTop}>
                            <View style={styles.reviewLeft}>
                                <View style={styles.reviewImageContainer}>
                                    <Image
                                        source={{
                                            uri: item.customer_details.image,
                                        }}
                                        style={styles.reviewImage}
                                    />
                                </View>
                                {console.log(item, 'itemitemitemitem')}
                                <View style={styles.reviewDetails}>
                                    <View style={styles.reviewName}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.reviewNameText}>
                                            {item?.customer_details?.name}
                                        </Text>
                                    </View>
                                    <View style={styles.starRatingContainer}>
                                        {item.rating >= 1 && (
                                            <View
                                                style={[
                                                    styles.starIcon,
                                                    {
                                                        marginRight: SIZE(2),
                                                    },
                                                ]}>
                                                <StarIcon
                                                    width={'100%'}
                                                    height={'100%'}
                                                />
                                            </View>
                                        )}
                                        {item.rating >= 2 && (
                                            <View
                                                style={[
                                                    styles.starIcon,
                                                    {
                                                        marginRight: SIZE(2),
                                                    },
                                                ]}>
                                                <StarIcon
                                                    width={'100%'}
                                                    height={'100%'}
                                                />
                                            </View>
                                        )}
                                        {item.rating >= 3 && (
                                            <View
                                                style={[
                                                    styles.starIcon,
                                                    {
                                                        marginRight: SIZE(2),
                                                    },
                                                ]}>
                                                <StarIcon
                                                    width={'100%'}
                                                    height={'100%'}
                                                />
                                            </View>
                                        )}
                                        {item.rating >= 4 && (
                                            <View
                                                style={[
                                                    styles.starIcon,
                                                    {
                                                        marginRight: SIZE(2),
                                                    },
                                                ]}>
                                                <StarIcon
                                                    width={'100%'}
                                                    height={'100%'}
                                                />
                                            </View>
                                        )}
                                        {item.rating >= 5 && (
                                            <View
                                                style={[
                                                    styles.starIcon,
                                                    {
                                                        marginRight: SIZE(2),
                                                    },
                                                ]}>
                                                <StarIcon
                                                    width={'100%'}
                                                    height={'100%'}
                                                />
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.reviewRight}>
                                <MenuIcon width={'100%'} height={'100%'} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.reviewMiddle}>
                            <Text
                                style={styles.review}
                                allowFontScaling={false}>
                                {item.review}
                            </Text>
                        </View>
                        <View style={styles.reviewBottom}>
                            <Text
                                style={styles.reviewDate}
                                allowFontScaling={false}>
                                {formattedDate}
                            </Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    reviewHeading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        letterSpacing: SIZE(0.5),
        marginBottom: SIZE(20),
    },
    reviewHeadingText: {
        color: '#242424',
        fontSize: SIZE(20),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    reviewAllText: {
        color: '#009FD3',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
    },
    ecomReviewingle: {
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
        borderRadius: SIZE(100),
    },
    reviewImage: {
        width: '100%',
        height: '100%',
    },
    reviewDetails: {},
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

    ratingContainer: {
        borderWidth: SIZE(1),
        borderColor: '#EDEDED',
        borderRadius: SIZE(73),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(11),
        paddingVertical: SIZE(7),
        backgroundColor: '#FFFFFF',
    },
    starIcon: {
        width: SIZE(16),
        height: SIZE(16),
        marginRight: SIZE(6),
    },
});

export default EcomReview;
