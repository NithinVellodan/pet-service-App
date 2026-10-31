import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Platform,
} from 'react-native';
//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {useNavigation} from '@react-navigation/native';
//svg
import StarIcon from '../../../../assets/icons/star.svg';
import StarDot from '../../../../assets/icons/map-view/starDot.svg';

//Components
import LoveButton from './LoveButton';

const TopProductCard = ({item, setUserModal, setScreen}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            key={item?.id}
            onPress={() =>
                navigation.navigate('ProductDetail', {
                    id: item?.id,
                })
            }
            activeOpacity={0.8}
            style={[styles.item]}>
            <View style={styles.imageContainer}>
                <Image source={{uri: item?.image}} style={styles.image} />
            </View>
            <View>
                <View style={styles.itemDescriptionContainer}>
                    <View style={styles.itemTitleMain}>
                        <View style={styles.itemTitleContainer}>
                            <Text
                                numberOfLines={1}
                                allowFontScaling={false}
                                style={styles.twoItemTitle}>
                                {item?.name}
                            </Text>
                        </View>
                        <LoveButton
                            setUserModal={setUserModal}
                            setScreen={setScreen}
                            item={item}
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <Text
                            numberOfLines={1}
                            allowFontScaling={false}
                            style={styles.twoImageDescription}>
                            {item?.description}
                        </Text>
                    </View>
                    <View style={styles.twoItemBottomContainer}>
                        <View style={styles.priceContainer}>
                            <Text
                                allowFontScaling={false}
                                style={styles.priceText}>
                                AED {item?.offer_price}
                            </Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <View style={styles.starContainer}>
                                {item?.rating > 0 ? (
                                    <StarIcon
                                        width={SIZE(18)}
                                        height={SIZE(18)}
                                    />
                                ) : (
                                    <StarDot
                                        width={SIZE(18)}
                                        height={SIZE(18)}
                                    />
                                )}
                            </View>
                            <View>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.starText}>
                                    {item?.rating > 0
                                        ? parseFloat(item?.rating?.toFixed(1))
                                        : 'New'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default TopProductCard;

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(10),
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SIZE(12),
        marginBottom: SIZE(12),
        paddingBottom: SIZE(160),
    },
    item: {
        width: '46%',
        backgroundColor: '#FFF',
        overflow: 'hidden',
        borderRadius: SIZE(12),
        borderWidth: SIZE(0.5),
        borderColor: '#E2E2E2',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.8)',
                shadowOffset: {width: 0, height: SIZE(3)},
                shadowOpacity: 0.3,
                shadowRadius: SIZE(12),
            },
            android: {
                elevation: SIZE(1),
            },
        }),
        margin: 8,
    },
    imageContainer: {
        width: '100%',
        height: SIZE(152),
        overflow: 'hidden',
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    itemDescriptionContainer: {
        paddingVertical: SIZE(16),
        paddingHorizontal: SIZE(12),
    },
    itemTitleMain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemTitleContainer: {
        width: '70%',
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
        marginTop: SIZE(8),
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
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
    },
    twoImageDescription: {
        fontSize: SIZE(14),
        marginTop: SIZE(10),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#757575',
    },
    twoItemBottomContainer: {
        marginTop: SIZE(16),

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceText: {
        fontSize: SIZE(12),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        color: '#00171F',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(8),
        paddingVertical: SIZE(5),
        borderRadius: SIZE(4),
        backgroundColor: '#EDEDED',
    },
    starContainer: {
        width: SIZE(16),
        height: SIZE(16),
        marginRight: SIZE(6),
    },
    starText: {
        fontSize: SIZE(12),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#969696',
    },
});
