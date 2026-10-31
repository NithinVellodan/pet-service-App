import React, {useState, useContext} from 'react';
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';

//packages
import {useNavigation} from '@react-navigation/native';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import LocationBlue from '../../assets/icons/trainers/location-blue.svg';
import Star from '../../assets/icons/map-view/star.svg';
import StarDot from '../../assets/icons/map-view/starDot.svg';

import Like from '../../assets/icons/map-view/Like.svg';
import LikeFill from '../../assets/icons/map-view/Likefill.svg';
import {Context} from '../../contexts/Store';
import ModalScreen from '../Profile-related/ModalScreen';
import UserLogin from '../booking/includes/UserLogin';
import {toggleWishlistTrainer} from '../main/TrainerApiSection';

//axios config
const CARD_WIDTH = SIZES.width;

const TrainerCard = React.memo(
    ({
        selected,
        params,
        description_is_false,
        is_wish_List,
        is_booking_page,
    }) => {
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
            toggleWishlistTrainer(selected.id, user_tocken);
            if (state.trainerWishList?.find(obj => obj.id === selected.id)) {
                dispatch({
                    type: 'ADD_TO_WISH_TRAINER',
                    trainerWishList: selected,
                });
            } else {
                let updatedData = {
                    ...selected,
                    is_in_wishlist: true,
                };
                dispatch({
                    type: 'ADD_TO_WISH_TRAINER',
                    trainerWishList: updatedData,
                });
            }
        };

        return (
            <TouchableOpacity
                disabled={is_booking_page ? true : false}
                key={selected?.id}
                onPress={() => {
                    navigation.navigate('TrainerSinglePage', {pk: selected.id});
                }}
                style={[styles.animatedContent]}
                activeOpacity={0.9}>
                <View
                    style={{
                        width: SIZE(60),
                        height: SIZE(60),
                        borderRadius: SIZE(30),
                    }}>
                    <Image
                        source={{uri: selected?.image}}
                        style={styles.imageSize}
                    />
                </View>

                <View style={styles.likeOptionComponent}>
                    <View style={styles.hedBox}>
                        <Text style={styles.mainHeading}>{selected?.name}</Text>
                        {is_wish_List ? (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    handlePress(selected);
                                }}
                                style={styles.commonButtonMain}>
                                <LikeFill width={SIZE(25)} height={SIZE(25)} />
                                <View style={styles.commonTopButtons}></View>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.ratingButton}>
                                {selected.average_rating > 0 ? (
                                    <Star height={SIZE(16)} width={SIZE(16)} />
                                ) : (
                                    <StarDot
                                        height={SIZE(16)}
                                        width={SIZE(16)}
                                    />
                                )}
                                <Text style={styles.ratingText}>
                                    {selected.average_rating > 0
                                        ? selected.average_rating
                                        : 'New'}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.locationContainer}>
                        <LocationBlue width={SIZE(12)} height={SIZE(12)} />
                        <Text
                            allowFontScaling={false}
                            numberOfLines={1}
                            style={styles.locationText}>
                            {selected?.location}
                        </Text>
                    </View>
                    {!description_is_false && (
                        <View style={{}}>
                            <Text
                                numberOfLines={2}
                                style={{
                                    width: SIZE(270),
                                    fontFamily: FONTS.regular,
                                    fontSize: SIZE(13),
                                    color: '#757575',
                                }}>
                                {selected?.description}
                            </Text>
                        </View>
                    )}
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
    },
);
const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
    },
    animatedContent: {
        borderRadius: SIZE(12),
        flexDirection: 'row',
        width: SIZES.width * 0.915,
        padding: SIZE(10),
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
    },
    likeOptionComponent: {
        justifyContent: 'space-around',
        width: SIZES.width * 0.7,
        marginLeft: SIZE(6),
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
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SIZE(5),
    },
    locationText: {
        color: '#242424',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        fontWeight: '400',
        marginLeft: SIZE(8),
        lineHeight: SIZE(17.5),
        width: SIZE(270),
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
        borderRadius: SIZE(100),
    },
});

export default TrainerCard;
