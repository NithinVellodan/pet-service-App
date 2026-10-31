import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import LocationIcon from '../../../assets/icons/locationblue.svg';
import LocationIconTwo from '../../../assets/icons/locationdark.svg';
import StarIcon from '../../../assets/icons/star.svg';
import StarDot from '../../../assets/icons/map-view/starDot.svg';

import MessageIcon from '../../../assets/icons/message.svg';
import {useRoute} from '@react-navigation/native';

//images and logos
import AvatarImage from '../../../assets/icons/avatar-new.svg';
import MaleLogo from '../../../assets/icons/male.svg';
import FemaleLogo from '../../../assets/icons/female.svg';

export const SectionProfile = ({
    navigation,
    singleItem,
    userId,
    userIdFromEmail,
    setUserModal,
    setScreen,
    state,
    singleItemPk,
}) => {
    return (
        <View style={styles.sellerContainer}>
            <View style={styles.sellerLeft}>
                <View style={styles.sellerProfile}>
                    {singleItem?.provider_details?.image ? (
                        <Image
                            style={styles.sellerProfileImage}
                            source={{
                                uri: singleItem?.provider_details?.image,
                            }}
                        />
                    ) : (
                        <AvatarImage
                            style={{marginRight: SIZE(12)}}
                            width={SIZE(40)}
                            height={SIZE(40)}
                        />
                    )}
                </View>
                <View style={styles.sellerDetails}>
                    <Text
                        numberOfLines={2}
                        allowFontScaling={false}
                        style={styles.sellerName}>
                        {singleItem?.provider_details?.name}
                    </Text>
                    <Text
                        allowFontScaling={false}
                        style={styles.sellerDescription}>
                        I am so glad to meet you, What can i do for you? Let’s
                        Chat
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                disabled={
                    userIdFromEmail === null
                        ? true
                        : false || userId === null
                        ? true
                        : false
                }
                onPress={() => {
                    if (state.userData.is_login) {
                        const chatType = 'borrow_a_pet';
                        navigation.navigate('ChatInner', {
                            item: {
                                otherUser: {
                                    id: userIdFromEmail,
                                    name: singleItem?.provider_details?.name,
                                },
                            },
                            userId: userId,
                            chatType: chatType,
                            profile: singleItem?.provider_details?.image,
                            pk: singleItemPk,
                            productName: singleItem?.name,
                            productImage: singleItem?.gallery?.[0]?.image,
                            productSubTitle: singleItem?.description,
                            type: 'Borrow',
                        });
                    } else {
                        setUserModal(true);
                        setScreen('login');
                    }
                }}
                activeOpacity={0.8}
                style={styles.messageIconContainer}>
                <View style={styles.messageIcon}>
                    <MessageIcon width={'100%'} height={'100%'} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const Spotlight = ({
    my_pet,
    is_customer,
    images,
    title,
    finalLocation,
    description,
    singleItem,
    isBorrow,
    pricePerDay,
}) => {
    const route = useRoute();
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <View>
            <View style={styles.topImageContainer}>
                <SwiperFlatList
                    onChangeIndex={index => setCurrentIndex(index.index)}
                    data={images}
                    renderItem={({item}) => (
                        <View style={styles.swiperMain}>
                            <Image
                                source={{uri: item.image}}
                                style={styles.swiperSub}
                            />
                        </View>
                    )}
                />
                {images?.length > 1 ? (
                    <View style={styles.swiperNumberMain}>
                        <View style={styles.swiperNumber}>
                            <Text style={styles.swiperNumberText}>
                                {currentIndex + 1}/{images?.length}
                            </Text>
                        </View>
                    </View>
                ) : (
                    ''
                )}
            </View>

            <View style={styles.detailsSection}>
                {!my_pet && (
                    <>
                        {isBorrow ? (
                            <View style={styles.mainContainerPet}>
                                <View style={styles.headingContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.headingText}>
                                        {singleItem?.name}
                                    </Text>
                                    <View style={styles.typeContainer}>
                                        <Text
                                            style={styles.typeText}
                                            allowFontScaling={false}>
                                            {singleItem?.pet_breed}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        alignSelf: 'center',
                                        flexDirection: 'row',
                                    }}>
                                    {singleItem?.gender === 'Male' ? (
                                        <MaleLogo
                                            style={{marginRight: SIZE(10)}}
                                            height={SIZE(24)}
                                            width={SIZE(24)}
                                        />
                                    ) : singleItem?.gender === 'Female' ? (
                                        <FemaleLogo
                                            style={{marginRight: SIZE(10)}}
                                            height={SIZE(24)}
                                            width={SIZE(24)}
                                        />
                                    ) : null}
                                    <Text
                                        style={[
                                            styles.review,
                                            {lineHeight: SIZE(20)},
                                        ]}>
                                        {singleItem &&
                                        singleItem?.gender === 'Not Specified'
                                            ? null
                                            : singleItem?.gender}
                                    </Text>
                                </View>
                            </View>
                        ) : (
                            <View>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.headingText}>
                                    {is_customer
                                        ? singleItem?.pet_breed
                                        : title}
                                </Text>
                            </View>
                        )}

                        <View style={styles.locationAndStar}>
                            <View style={styles.locationSub}>
                                <View style={styles.locationIcon}>
                                    {route?.name === 'BorrowPetSingle' ? (
                                        <LocationIcon
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    ) : (
                                        <LocationIconTwo
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    )}
                                </View>
                                <View style={styles.locationTextContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.locationText}>
                                        {is_customer
                                            ? singleItem?.location_name
                                            : finalLocation}
                                    </Text>
                                </View>
                            </View>
                            {route?.name === 'BorrowPetSingle' &&
                                is_customer &&
                                isBorrow && (
                                    <View style={styles.ratingContainer}>
                                        <View style={styles.starIcon}>
                                            {singleItem?.average_rating > 0 ? (
                                                <StarIcon
                                                    width={'100%'}
                                                    height={'100%'}
                                                />
                                            ) : (
                                                <StarDot
                                                    width={'100%'}
                                                    height={'100%'}
                                                />
                                            )}
                                        </View>
                                        <View
                                            style={styles.ratingTextContainer}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.ratingText}>
                                                {singleItem?.average_rating > 0
                                                    ? singleItem?.average_rating
                                                    : 'New'}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text
                                allowFontScaling={false}
                                style={styles.descriptionText}>
                                {is_customer
                                    ? singleItem?.description
                                    : description}
                            </Text>
                        </View>
                    </>
                )}
                {route?.params?.type === 'BorrowAPet' && (
                    <View style={styles.priceHeading}>
                        <Text
                            allowFontScaling={false}
                            style={styles.priceMainText}>
                            AED {pricePerDay}
                            <Text
                                allowFontScaling={false}
                                style={styles.priceSubText}>
                                {' '}
                                /day
                            </Text>
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default Spotlight;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    topImageContainer: {
        marginBottom: SIZE(24),
        width: SIZES.width,
        height: SIZE(316),
    },
    swiperMain: {
        flex: 1,
        overflow: 'hidden',
        width: SIZES.width,
        height: SIZE(316),
    },
    swiperSub: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    swiperNumberMain: {
        padding: SIZE(16),
        position: 'absolute',
        zIndex: 1000,
        bottom: 0,
        right: 0,
    },
    swiperNumber: {
        backgroundColor: '#fff',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(6),
        borderRadius: SIZE(61),
        minWidth: SIZE(59),
        alignItems: 'center',
    },
    swiperNumberText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    detailsSection: {
        paddingHorizontal: SIZE(16),
    },
    mainContainerPet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headingText: {
        color: '#242424',
        fontSize: SIZE(24),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    typeContainer: {
        borderWidth: SIZE(1),
        backgroundColor: '#fff',
        borderColor: '#ededed',
        borderRadius: SIZE(20),
        paddingVertical: SIZE(6),
        paddingHorizontal: SIZE(14),
        alignItems: 'center',
        marginLeft: SIZE(12),
    },
    typeText: {
        color: '#969696',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    locationAndStar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: SIZE(10),
    },
    locationSub: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
    },
    locationIcon: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(8),
    },
    locationTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    locationText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    ratingContainer: {
        borderWidth: SIZE(1),
        borderColor: '#EDEDED',
        borderRadius: SIZE(73),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZE(11),
        paddingVertical: SIZE(7),
        backgroundColor: '#FFFFFF',
    },
    starIcon: {
        width: SIZE(16),
        height: SIZE(16),
        marginRight: SIZE(6),
    },
    ratingTextContainer: {},
    ratingText: {
        color: '#969696',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    descriptionContainer: {},
    descriptionText: {
        color: '#686868',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
    },

    availabilityHeading: {
        marginBottom: SIZE(12),
    },
    priceHeading: {
        paddingVertical: SIZE(24),
    },
    priceMainText: {
        color: '#242424',
        fontSize: SIZE(24),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    priceSubText: {
        color: '#242424',
        fontSize: SIZE(20),
        fontWeight: '500',
        fontFamily: FONTS.medium,
    },

    sellerContainer: {
        flexDirection: 'row',
        padding: SIZE(16),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        backgroundColor: '#FFFFFF',
        borderRadius: SIZE(8),
        alignItems: 'center',
        marginBottom: SIZE(32),
    },
    sellerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sellerProfile: {
        width: SIZE(60),
        height: SIZE(60),
        marginRight: SIZE(12),
        borderRadius: SIZE(60),
        overflow: 'hidden',
    },
    sellerProfileImage: {
        width: '100%',
        height: '100%',
    },
    sellerDetails: {
        width: SIZE(224),
        marginRight: SIZE(12),
    },
    sellerName: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        marginBottom: SIZE(8),
    },
    sellerDescription: {
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    messageIconContainer: {
        width: SIZE(48),
        height: SIZE(48),
        borderRadius: SIZE(48),
        backgroundColor: '#009FD3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageIcon: {
        width: SIZE(24),
        height: SIZE(24),
    },
});
