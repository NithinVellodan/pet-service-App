import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useState} from 'react';
//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
//images and logos
import HeartIcon from '../../../assets/icons/heart.svg';
import HeartIconFIlled from '../../../assets/icons/heartfilled.svg';
import StarIcon from '../../../assets/icons/star.svg';
import Star from '../../../assets/icons/map-view/star.svg';

import StarDot from '../../../assets/icons/map-view/starDot.svg';

import {toggleWishlistPet, toggleWishlistStay} from '../ApiSection';
import {Context} from '../../../contexts/Store';
import ModalScreen from '../../Profile-related/ModalScreen';
import UserLogin from '../../booking/includes/UserLogin';
import LocationBlack from '../../../assets/icons/locationblack.svg';

const CARD_WIDTH = SIZES.width;

const TwoItemCarousel = ({navigation, selected, selectedFilter}) => {
    const {state, dispatch} = useContext(Context);
    const [userModal, setUserModal] = useState(false);
    const [isType, setType] = useState('mail');

    const handlePress = async selected => {
        let user_tocken = state;
        toggleWishlistStay(selected.id, user_tocken);
        if (state.additionalData?.find(obj => obj.id === selected.id)) {
            dispatch({
                type: 'UPDATE_ADDITIONAL_DATA',
                additionalData: selected,
            });
        } else {
            let updatedData = {
                ...selected,
                is_in_wishlist: true,
            };
            console.log('no____match');
            dispatch({
                type: 'UPDATE_ADDITIONAL_DATA',
                additionalData: updatedData,
            });
        }
    };

    const handlePressPet = async selected => {
        let user_tocken = state;
        toggleWishlistPet(selected.id, user_tocken);
        if (state.additionalDataPetWish?.find(obj => obj.id === selected.id)) {
            dispatch({
                type: 'UPDATE_ADDITIONAL_DATA_PET_WISH',
                additionalDataPetWish: selected,
            });
        } else {
            let updatedData = {
                ...selected,
                is_in_wishlist: true,
            };
            dispatch({
                type: 'UPDATE_ADDITIONAL_DATA_PET_WISH',
                additionalDataPetWish: updatedData,
            });
        }
    };
    return (
        <View style={styles.twoImageCarousel}>
            <TouchableOpacity
                onPress={() => {
                    if (selectedFilter?.type == 'Borrow a Pet') {
                        navigation.navigate('BorrowPetSingle', {
                            pk: selected.id,
                            selected: selected,
                        });
                    } else {
                        navigation.navigate('PetSingle', {
                            pk: selected.id,
                            selected: selected,
                        });
                    }
                }}
                activeOpacity={0.8}
                style={[styles.twoItem, {marginRight: SIZE(16)}]}>
                <View style={styles.twoImageContainer}>
                    {selected?.image && (
                        <Image
                            source={{uri: selected.image}}
                            style={styles.twoImage}
                        />
                    )}
                </View>
                <View style={styles.twoItemDescriptionContainer}>
                    <View style={styles.twoItemTitleMain}>
                        <View style={styles.twoItemTitleContainer}>
                            <Text
                                numberOfLines={1}
                                allowFontScaling={false}
                                style={styles.twoItemTitle}>
                                {selected?.title
                                    ? selected?.title
                                    : selected?.pet_breed}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                if (state.userData.is_login) {
                                    if (
                                        selectedFilter?.type == 'Borrow a Pet'
                                    ) {
                                        handlePressPet(selected);
                                    } else {
                                        handlePress(selected);
                                    }
                                } else {
                                    setUserModal(true);
                                }
                            }}
                            activeOpacity={0.8}
                            style={styles.wishlistIconContainer}>
                            {selectedFilter?.type == 'Borrow a Pet' ? (
                                state.additionalDataPetWish?.find(
                                    obj => obj?.id === selected.id,
                                ) ? (
                                    <HeartIconFIlled
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                ) : (
                                    <HeartIcon width={'100%'} height={'100%'} />
                                )
                            ) : state.additionalData?.find(
                                  obj => obj?.id === selected.id,
                              ) ? (
                                <HeartIconFIlled
                                    width={'100%'}
                                    height={'100%'}
                                />
                            ) : (
                                <HeartIcon width={'100%'} height={'100%'} />
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.twoItemContainer}>
                        <Text
                            numberOfLines={1}
                            allowFontScaling={false}
                            style={styles.twoImageDescription}>
                            {selected?.description}
                        </Text>
                    </View>
                    <View style={styles.twoItemBottomContainer}>
                        <View style={styles.priceContainer}>
                            <Text
                                allowFontScaling={false}
                                style={styles.priceText}>
                                AED{' '}
                                <Text style={{fontSize: SIZE(12)}}>
                                    {selected?.price} /day
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <View style={styles.starContainer}>
                                {selected?.average_rating > 0 ? (
                                    <Star width={'100%'} height={'100%'} />
                                ) : (
                                    <StarDot width={'100%'} height={'100%'} />
                                )}
                            </View>
                            <View style={styles.starTextContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.starText}>
                                    {selected?.average_rating > 0
                                        ? selected?.average_rating
                                        : 'New'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <ModalScreen
                isVisible={userModal}
                setVisible={setUserModal}
                inner={<UserLogin isType={isType} close={setUserModal} />}
            />
        </View>
    );
};

export default TwoItemCarousel;

export const ArrivalItem = ({navigation, selected, selectedFilter}) => {
    const {state, dispatch} = useContext(Context);

    const handlePress = async selected => {
        let user_tocken = state;
        toggleWishlistStay(selected.id, user_tocken);
        if (state.additionalData?.find(obj => obj.id === selected.id)) {
            dispatch({
                type: 'UPDATE_ADDITIONAL_DATA',
                additionalData: selected,
            });
        } else {
            let updatedData = {
                ...selected,
                is_in_wishlist: true,
            };
            console.log('no____match');
            dispatch({
                type: 'UPDATE_ADDITIONAL_DATA',
                additionalData: updatedData,
            });
        }
    };

    const handlePressPet = async selected => {
        let user_tocken = state;
        toggleWishlistPet(selected.id, user_tocken);
        if (state.additionalDataPetWish?.find(obj => obj.id === selected.id)) {
            dispatch({
                type: 'UPDATE_ADDITIONAL_DATA_PET_WISH',
                additionalDataPetWish: selected,
            });
        } else {
            let updatedData = {
                ...selected,
                is_in_wishlist: true,
            };
            dispatch({
                type: 'UPDATE_ADDITIONAL_DATA_PET_WISH',
                additionalDataPetWish: updatedData,
            });
        }
    };
    return (
        <TouchableOpacity
            key={selected.id}
            onPress={() => {
                if (selectedFilter?.type == 'Borrow a Pet') {
                    navigation.navigate('BorrowPetSingle', {
                        pk: selected.id,
                        selected: selected,
                    });
                } else {
                    navigation.navigate('PetSingle', {
                        pk: selected.id,
                        selected: selected,
                    });
                }
            }}
            style={{
                borderWidth: 0,
                alignItems: 'center',
            }}
            activeOpacity={0.9}>
            <View style={[styles.animatedContent]}>
                <View style={{width: SIZE(120), height: CARD_WIDTH / 2.9}}>
                    <Image
                        source={{uri: selected.image}}
                        style={styles.imageSize}
                    />
                </View>
                <View style={styles.likeOptionComponent}>
                    <View style={styles.hedBox}>
                        <Text style={styles.mainHeading}>
                            {selected?.title
                                ? selected?.title
                                : selected?.pet_breed}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                if (state.userData.is_login) {
                                    if (
                                        selectedFilter?.type == 'Borrow a Pet'
                                    ) {
                                        handlePressPet(selected);
                                    } else {
                                        handlePress(selected);
                                    }
                                } else {
                                    setUserModal(true);
                                }
                            }}
                            activeOpacity={0.8}
                            style={styles.wishlistIconContainer}>
                            {selectedFilter?.type == 'Borrow a Pet' ? (
                                state.additionalDataPetWish?.find(
                                    obj => obj?.id === selected.id,
                                ) ? (
                                    <HeartIconFIlled
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                ) : (
                                    <HeartIcon width={'100%'} height={'100%'} />
                                )
                            ) : state.additionalData?.find(
                                  obj => obj?.id === selected.id,
                              ) ? (
                                <HeartIconFIlled
                                    width={'100%'}
                                    height={'100%'}
                                />
                            ) : (
                                <HeartIcon width={'100%'} height={'100%'} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.locationContainer}>
                        <LocationBlack width={SIZE(12)} height={SIZE(12)} />
                        <Text
                            allowFontScaling={false}
                            numberOfLines={1}
                            style={styles.locationText}>
                            {selected.location}
                        </Text>
                    </View>
                    <View style={{marginVertical: SIZE(10)}}>
                        <Text
                            numberOfLines={2}
                            style={{
                                width: SIZE(240),
                                fontFamily: FONTS.regular,
                                fontSize: SIZE(13),
                                color: '#757575',
                            }}>
                            {selected.description}
                        </Text>
                    </View>
                    <View style={styles.bottomContentBox}>
                        <Text style={styles.bottomContent}>
                            AED{' '}
                            {selectedFilter?.page_type === 'place-to-stay'
                                ? selected.price
                                : selectedFilter?.page_type === 'borrow-pet'
                                ? selected.price_per_day
                                : null}
                            /day
                        </Text>
                        <View style={styles.ratingButton}>
                            {selected?.average_rating > 0 ? (
                                <Star height={SIZE(16)} width={SIZE(16)} />
                            ) : (
                                <StarDot height={SIZE(16)} width={SIZE(16)} />
                            )}
                            <Text style={styles.ratingText}>
                                {selected?.average_rating > 0
                                    ? selected?.average_rating
                                    : 'New'}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    twoImageCarousel: {
        flexDirection: 'row',
    },
    twoItem: {
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        borderRadius: SIZE(12),
    },
    twoImageContainer: {
        width: SIZE(190),
        height: SIZE(152),
        overflow: 'hidden',
    },
    twoImage: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    twoItemDescriptionContainer: {
        paddingVertical: SIZE(16),
        paddingHorizontal: SIZE(12),
    },
    twoItemTitleMain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    twoItemTitleContainer: {
        width: SIZE(134),
    },
    twoItemTitle: {
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.medium,
        color: '#000',
    },
    wishlistIconContainer: {
        width: SIZE(28),
        height: SIZE(28),
        padding: SIZE(6),
        backgroundColor: '#EAF7FF',
        borderRadius: SIZE(50),
    },
    twoItemContainer: {
        marginVertical: SIZE(8),
        width: SIZE(134),
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZE(8),
    },
    locationText: {
        color: '#242424',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        fontWeight: '400',
        marginLeft: SIZE(8),
        width: SIZE(200),
    },
    twoImageDescription: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#757575',
    },
    twoItemBottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceText: {
        fontSize: SIZE(12),
        fontWeight: '600',
        fontFamily: FONTS.medium,
        color: '#00171F',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZE(5),
        paddingHorizontal: SIZE(10),
        borderRadius: SIZE(30),
        backgroundColor: '#F7F7F7',
        borderWidth: SIZE(1),
        borderColor: '#EDEDED',
    },
    starContainer: {
        width: SIZE(16),
        height: SIZE(16),
        marginRight: SIZE(3),
    },
    starTextContainer: {},
    starText: {
        fontSize: SIZE(12),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#969696',
    },

    box: {
        flexDirection: 'row',
    },
    animatedContent: {
        borderRadius: SIZE(12),
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: CARD_WIDTH / 2.9,
    },
    likeOptionComponent: {
        padding: SIZE(12),
        justifyContent: 'space-around',
    },
    hedBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mainHeading: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        color: '#242424',
        fontWeight: '600',
    },
    subHeading: {
        color: '#757575',
        fontFamily: FONTS.regular,
        fontSize: SIZE(13),
        width: CARD_WIDTH * 0.5,
    },
    bottomContentBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomContent: {
        color: '#00171F',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(13),
        fontWeight: '600',
    },
    ratingButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: SIZE(0.6),
        borderRadius: SIZE(20),
        paddingHorizontal: SIZE(8),
        paddingVertical: SIZE(5),
        borderColor: '#EDEDED',
        backgroundColor: '#F7F7F7',
    },
    ratingText: {
        fontFamily: FONTS.regular,
        color: '#969696',
        fontSize: SIZE(12),
        marginLeft: SIZE(5),
        fontWeight: '400',
    },
    imageSize: {
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: SIZE(12),
        borderBottomLeftRadius: SIZE(12),
    },
});
