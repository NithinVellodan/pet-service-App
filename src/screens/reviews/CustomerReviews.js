import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
// Packages
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
// Components
import Headers from '../includes/headers/Headers';
// Icons
import Star from '../../assets/icons/star.svg';
import StarLight from '../../assets/icons/starlight.svg';
import AvatarImage from '../../assets/icons/avatar-new.svg';
import CustomerReviews1 from './CustomerReviews1';

const CustomerReviews = ({route}) => {
    const [reviewItems, setReviewItems] = useState(route?.params?.reviews);
    const totalStars = 5;

    return (
        <View style={styles.container}>
            <Headers
                headText={route?.params?.reviews ? 'Reviews' : 'My Reviews'}
            />
            {route?.params?.reviews ? (
                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.reviewContainer}>
                        <>
                            {reviewItems?.map(item => {
                                const start_date = item?.date_updated
                                    ? new Date(
                                          item.date_updated,
                                      ).toLocaleDateString('en-GB', {
                                          day: '2-digit',
                                          month: 'short',
                                          year: 'numeric',
                                      })
                                    : '';
                                return (
                                    <View
                                        key={item.id}
                                        style={styles.reviewSection}>
                                        <View style={styles.centerContainer}>
                                            {item?.customer_details?.image ? (
                                                <View style={styles.replyImage}>
                                                    <Image
                                                        style={styles.ImagePet}
                                                        source={{
                                                            uri: item
                                                                ?.customer_details
                                                                ?.image,
                                                        }}
                                                    />
                                                </View>
                                            ) : (
                                                <AvatarImage
                                                    style={{
                                                        marginRight: SIZE(12),
                                                    }}
                                                    width={SIZE(40)}
                                                    height={SIZE(40)}
                                                />
                                            )}
                                            <View style={styles.rightBox}>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={styles.textName}>
                                                    {
                                                        item?.customer_details
                                                            ?.name
                                                    }
                                                </Text>
                                                <View style={styles.replyStar}>
                                                    {[
                                                        ...Array(item.rating),
                                                    ].map((_, index) => (
                                                        <Star
                                                            key={index}
                                                            width={SIZE(16)}
                                                            height={SIZE(16)}
                                                        />
                                                    ))}
                                                    {[
                                                        ...Array(
                                                            totalStars -
                                                                item.rating,
                                                        ),
                                                    ].map((_, index) => (
                                                        <StarLight
                                                            key={index}
                                                            width={SIZE(16)}
                                                            height={SIZE(16)}
                                                        />
                                                    ))}
                                                </View>
                                            </View>
                                        </View>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.text}>
                                            {item.review}
                                        </Text>
                                        <View style={styles.reviewBottom}>
                                            <Text
                                                style={styles.reviewDate}
                                                allowFontScaling={false}>
                                                {start_date ? start_date : ''}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </>
                        <></>
                    </View>
                </ScrollView>
            ) : (
                <CustomerReviews1 route={route} />
            )}
        </View>
    );
};

export default CustomerReviews;

const styles = StyleSheet.create({
    container: {flex: 1},
    filterBox: {
        paddingHorizontal: SIZE(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SIZE(24),
    },
    filterItem: {
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
        borderWidth: SIZE(1),
        borderRadius: SIZE(20),
        width: SIZE(124),
    },
    filterItemText: {
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(18),
        fontFamily: FONTS.semiBold,
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(16),
        paddingTop: SIZE(18),
        marginBottom: SIZE(18),
    },
    topButtons: {
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        borderRadius: SIZE(8),
        padding: SIZE(4),
        borderColor: '#E2E2E2',
        backgroundColor: '#FFFFFF',
    },
    selectItem: {
        paddingVertical: SIZE(10),
        paddingHorizontal: SIZE(8),

        borderRadius: SIZE(8),
        width: SIZE(180),
        alignItems: 'center',
    },
    filterText: {
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
    },
    reviewContainer: {
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(225),
        paddingTop: SIZE(20),
    },
    reviewSection: {
        marginBottom: SIZE(16),
        backgroundColor: '#fff',
        padding: SIZE(16),
        borderRadius: SIZE(8),
    },
    centerContainer: {
        flexDirection: 'row',
    },
    replyImage: {
        width: SIZE(40),
        height: SIZE(40),
        overflow: 'hidden',
        borderRadius: SIZE(100),
        marginRight: SIZE(16),
    },
    ImagePet: {
        width: '100%',
        height: '100%',
        borderRadius: SIZE(40),
    },
    rightBox: {
        flex: 1,
        borderColor: '#E2E2E2',
        paddingBottom: SIZE(12),
    },
    textName: {
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(17),
        color: '#242424',
        textAlign: 'justify',
    },
    text: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        color: '#757575',
        marginBottom: SIZE(8),
    },
    replyStar: {
        flexDirection: 'row',
    },
    addReviewButton: {
        alignSelf: 'flex-end',
        marginTop: SIZE(15),
    },
    addReviewText: {
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
        color: '#009FD3',
        letterSpacing: SIZE(0.5),
    },
    reviewEditSection: {
        marginBottom: SIZE(16),
        backgroundColor: '#fff',
        padding: SIZE(16),
        borderRadius: SIZE(8),
    },
    centerEditContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#E2E2E2',
        paddingBottom: SIZE(12),
    },
    replyEditImage: {
        width: SIZE(100),
        height: SIZE(100),
        overflow: 'hidden',
        borderRadius: SIZE(8),
        marginRight: SIZE(16),
    },
    ImageEditPet: {
        width: SIZE(100),
        height: SIZE(100),
    },
    rightEditBox: {
        flex: 1,
    },
    textNameEdit: {
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(17),
        color: '#242424',
        textAlign: 'justify',
    },
    textEdit: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        color: '#757575',
        marginBottom: SIZE(8),
    },
    replyEditStar: {
        flexDirection: 'row',
    },
    editSection: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: SIZE(16),
        alignItems: 'center',
    },
    reviewDate: {
        color: '#969696',
        fontSize: SIZE(12),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
});
