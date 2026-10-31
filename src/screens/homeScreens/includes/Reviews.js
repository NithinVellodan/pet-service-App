import React, {useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import StarIcon from '../../../assets/icons/star.svg';
import StarLight from '../../../assets/icons/starlight.svg';
import {Context} from '../../../contexts/Store';
import {useNavigation} from '@react-navigation/native';
import AvatarImage from '../../../assets/icons/avatar-new.svg';
import moment from 'moment';

const Reviews = ({singleItem}) => {
    const navigation = useNavigation();

    const {state} = useContext(Context);

    return (
        <View>
            <View style={styles.reviewHeading}>
                <Text allowFontScaling={false} style={styles.reviewHeadingText}>
                    Reviews
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        if (state?.userData?.is_service) {
                            navigation.navigate('MyReviews');
                        } else if (!state.userData.is_service) {
                            navigation.navigate('CustomerReviews', {
                                reviews: singleItem?.reviews,
                            });
                        }
                    }}
                    activeOpacity={0.8}
                    style={styles.reviewAllContainer}>
                    <Text allowFontScaling={false} style={styles.reviewAllText}>
                        View All
                    </Text>
                </TouchableOpacity>
            </View>
            {singleItem?.reviews?.map(item => {
                return (
                    <View key={item.id} style={styles.reviewSingle}>
                        <View style={styles.reviewTop}>
                            <View style={styles.reviewLeft}>
                                <View style={styles.reviewImageContainer}>
                                    {item.customer_details.image ? (
                                        <View style={styles.reviewsHeadImage}>
                                            <Image
                                                style={{
                                                    height: '100%',
                                                    width: '100%',
                                                    borderRadius: SIZE(40),
                                                }}
                                                source={{
                                                    uri: item.customer_details
                                                        .image,
                                                }}
                                            />
                                        </View>
                                    ) : (
                                        <AvatarImage
                                            style={{marginRight: SIZE(12)}}
                                            width={SIZE(40)}
                                            height={SIZE(40)}
                                        />
                                    )}
                                </View>
                                <View style={styles.reviewDetails}>
                                    <View style={styles.reviewName}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.reviewNameText}>
                                            {item.customer_details.name}
                                        </Text>
                                    </View>
                                    <View style={styles.starRatingContainer}>
                                        {[...Array(item.rating)].map(
                                            (_, index) => (
                                                <StarIcon
                                                    key={index}
                                                    width={SIZE(16)}
                                                    height={SIZE(16)}
                                                />
                                            ),
                                        )}
                                        {[...Array(5 - item.rating)].map(
                                            (_, index) => (
                                                <StarLight
                                                    key={index}
                                                    width={SIZE(16)}
                                                    height={SIZE(16)}
                                                />
                                            ),
                                        )}
                                    </View>
                                </View>
                            </View>
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
                                {moment(item.date_added).format('DD/MMM/YYYY')}
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
    reviewsHeadImage: {
        width: SIZE(40),
        height: SIZE(40),
        marginRight: SIZE(12),
    },
});

export default Reviews;
