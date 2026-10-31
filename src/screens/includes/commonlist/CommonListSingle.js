import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useState} from 'react';

//packages
import {useNavigation, useRoute} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//images and logos
import HeartIcon from '../../../assets/icons/heart.svg';
import HeartIconFilled from '../../../assets/icons/heartfilled.svg';
import StarIcon from '../../../assets/icons/star.svg';
import StarDot from '../../../assets/icons/map-view/starDot.svg';

import {Context} from '../../../contexts/Store';
import {toggleWishlistPet, toggleWishlistStay} from '../../main/ApiSection';
import ModalScreen from '../../Profile-related/ModalScreen';
import UserLogin from '../../booking/includes/UserLogin';
import LocationBlack from '../../../assets/icons/locationblack.svg';

const CommonListSingle = ({item, selected, selectedFilter}) => {
    const {state, dispatch} = useContext(Context);
    const navigation = useNavigation();
    const route = useRoute();
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
            console.log('no____match');
            dispatch({
                type: 'UPDATE_ADDITIONAL_DATA_PET_WISH',
                additionalDataPetWish: updatedData,
            });
        }
    };

    return (
        <TouchableOpacity
            disabled={
                route?.name === 'BookingSummaryBorrowPet' ||
                route?.name === 'BookingSummary'
            }
            onPress={() => {
                navigation.navigate('PetSingle');
            }}
            activeOpacity={0.8}
            key={selected ? selected.id : item.id}>
            <Animatable.View
                animation={
                    route?.name === 'BookingSummaryBorrowPet' ||
                    route?.name === 'BookingSummary'
                        ? ''
                        : 'fadeInUp'
                }
                style={styles.listSingle}>
                <View style={styles.imageLeftContainer}>
                    <Image
                        style={styles.image}
                        source={selected ? {uri: selected.image} : item.image}
                    />
                </View>
                <View style={styles.singleRightContainer}>
                    <View style={styles.headingContainer}>
                        <View style={styles.headingTextContainer}>
                            <Text
                                numberOfLines={1}
                                allowFontScaling={false}
                                style={styles.headingText}>
                                {selected ? selected.title : item.name}
                            </Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.wishlistIcon}
                            onPress={() => {
                                if (state.userData.is_login) {
                                    if (selectedFilter === 'Borrow a Pet') {
                                        handlePressPet(selected);
                                    } else {
                                        handlePress(selected);
                                    }
                                } else {
                                    setUserModal(true);
                                }
                            }}>
                            {selectedFilter === 'Borrow a Pet' ? (
                                state.additionalDataPetWish?.find(
                                    obj => obj?.id === selected?.id,
                                ) ? (
                                    <HeartIconFilled
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                ) : (
                                    <HeartIcon width={'100%'} height={'100%'} />
                                )
                            ) : state.additionalData?.find(
                                  obj => obj?.id === selected?.id,
                              ) ? (
                                <HeartIconFilled
                                    width={'100%'}
                                    height={'100%'}
                                />
                            ) : (
                                <HeartIcon width={'100%'} height={'100%'} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.locationContainer}>
                        <LocationBlack width={SIZE(16)} height={SIZE(16)} />
                        <Text
                            allowFontScaling={false}
                            numberOfLines={1}
                            style={styles.locationText}>
                            {selected?.location}
                        </Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <View style={styles.descriptionTextContainer}>
                            <Text
                                numberOfLines={2}
                                allowFontScaling={false}
                                style={styles.descriptionText}>
                                {selected
                                    ? selected.description
                                    : item.description}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.priceAndRating}>
                        <View style={styles.priceContainer}>
                            <Text
                                allowFontScaling={false}
                                style={styles.priceText}>
                                AED{' '}
                                {selected ? selected.price_per_day : item.price}
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        fontSize: SIZE(12),
                                    }}>
                                    /day
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <View style={styles.starContainer}>
                                {selected ? (
                                    selected.average_rating > 0 ? (
                                        <StarIcon
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    ) : (
                                        <StarDot
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    )
                                ) : item.rating > 0 ? (
                                    <StarIcon width={'100%'} height={'100%'} />
                                ) : (
                                    <StarDot width={'100%'} height={'100%'} />
                                )}
                            </View>
                            <View style={styles.ratingTextContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.ratingText}>
                                    {selected
                                        ? selected.average_rating > 0
                                            ? selected.average_rating
                                            : 'New'
                                        : item.rating > 0
                                        ? item.rating
                                        : 'New'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Animatable.View>
            <ModalScreen
                isVisible={userModal}
                setVisible={setUserModal}
                inner={<UserLogin isType={isType} close={setUserModal} />}
            />
        </TouchableOpacity>
    );
};

export default CommonListSingle;

const styles = StyleSheet.create({
    listSingle: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: SIZE(8),
        marginTop: SIZE(16),
        overflow: 'hidden',
    },
    imageLeftContainer: {
        width: SIZE(136),
        height: SIZE(136),
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    singleRightContainer: {
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(12),
        flex: 1,
        justifyContent: 'space-between',
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SIZE(8),
    },
    headingTextContainer: {
        width: SIZE(180),
    },
    headingText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    wishlistIcon: {
        width: SIZE(28),
        height: SIZE(28),
        padding: SIZE(6),
        backgroundColor: '#EAF7FF',
        borderRadius: SIZE(50),
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZE(8),
    },
    locationText: {
        color: '#242424',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        fontWeight: '400',
        marginLeft: SIZE(8),
        lineHeight: SIZE(17.5),
    },
    descriptionContainer: {
        marginBottom: SIZE(8),
    },
    descriptionTextContainer: {},
    descriptionText: {
        color: '#757575',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
    },
    priceAndRating: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceContainer: {},
    priceText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZE(8),
        paddingVertical: SIZE(4),
        borderWidth: SIZE(1),
        borderRadius: SIZE(12),
        backgroundColor: '#F7F7F7',
        borderColor: '#ededed',
    },
    starContainer: {
        width: SIZE(16),
        height: SIZE(16),
        marginRight: SIZE(5),
    },
    ratingTextContainer: {},
    ratingText: {
        color: '#969696',
        fontSize: SIZE(12),
        fontWeight: '400',
        fontFamily: FONTS.regular,
    },
});
