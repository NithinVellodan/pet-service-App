import React, {useContext, useState} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';

//packages
import {useNavigation} from '@react-navigation/native';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

//images and logos
import Like from '../../assets/icons/map-view/Like.svg';
import Star from '../../assets/icons/map-view/star.svg';
import StarDot from '../../assets/icons/map-view/starDot.svg';

import {Context} from '../../contexts/Store';
import LikeFill from '../../assets/icons/map-view/Likefill.svg';
import {toggleWishlistPet, toggleWishlistStay} from '../main/ApiSection';
import ModalScreen from '../Profile-related/ModalScreen';
import UserLogin from '../booking/includes/UserLogin';

//axios config
const CARD_WIDTH = SIZES.width;

const MapViewCardOptional = ({selected, params, selectedFilter}) => {
    const navigation = useNavigation();
    const {state, dispatch} = useContext(Context);

    const [navigate, setNavigate] = useState(params ? params : '');
    const [userModal, setUserModal] = useState(false);
    const [isType, setType] = useState('mail');
    const [screen, setScreen] = useState(false);
    const [is_Firbase, setIs_Firbase] = useState({
        is_fireBase: false,
        email: '',
        google_id_token: '',
    });

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
                if (
                    navigate?.direction_of == 'Borrow' ||
                    selectedFilter == 'borrow'
                ) {
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
            activeOpacity={0.7}>
            <View style={styles.animatedContent}>
                <View style={{width: SIZE(80)}}>
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
                                : selected?.pet_breed}{' '}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                if (state.userData.is_login) {
                                    if (selectedFilter == 'borrow') {
                                        handlePressPet(selected);
                                    } else {
                                        handlePress(selected);
                                    }
                                } else {
                                    setUserModal(true);
                                    setScreen('login');
                                }
                            }}>
                            {selectedFilter == 'place_to_stay' ? (
                                state.additionalData?.find(
                                    obj => obj?.id === selected.id,
                                ) ? (
                                    <LikeFill
                                        width={SIZE(28)}
                                        height={SIZE(28)}
                                    />
                                ) : (
                                    <Like width={SIZE(28)} height={SIZE(28)} />
                                )
                            ) : state.additionalDataPetWish?.find(
                                  obj => obj?.id === selected.id,
                              ) ? (
                                <LikeFill width={SIZE(28)} height={SIZE(28)} />
                            ) : (
                                <Like width={SIZE(28)} height={SIZE(28)} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomContentBox}>
                        <Text style={styles.bottomContent}>
                            AED{' '}
                            {navigate?.direction_of == 'Borrow'
                                ? selected.price_per_day
                                : selected.price}{' '}
                            /day
                        </Text>
                        <View style={styles.ratingButton}>
                            {selected.average_rating > 0 ? (
                                <Star height={SIZE(16)} width={SIZE(16)} />
                            ) : (
                                <StarDot width={SIZE(18)} height={SIZE(18)} />
                            )}
                            <Text style={styles.ratingText}>
                                {selected.average_rating > 0
                                    ? selected.average_rating
                                    : 'New'}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <ModalScreen
                isVisible={userModal}
                setVisible={setUserModal}
                inner={
                    <UserLogin
                        isType={isType}
                        close={setUserModal}
                        screen={screen}
                        is_Firbase={is_Firbase}
                        setIs_Firbase={setIs_Firbase}
                    />
                }
            />
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
    },
    animatedContent: {
        borderRadius: SIZE(12),
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: SIZE(90),
        width: CARD_WIDTH * 0.9,
    },
    likeOptionComponent: {
        width: CARD_WIDTH / 1.43,
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
        borderColor: '#eee',
        backgroundColor: '#f7f7f7',
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

export default MapViewCardOptional;
