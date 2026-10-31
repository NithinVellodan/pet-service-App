import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {React} from 'react';

//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {useNavigation} from '@react-navigation/native';

//svg
import Avatar from '../../../../assets/icons/avatar-new.svg';

export default function DonatedProducts({
    item,
    staticitems,
    all_product_listPage,
}) {
    //useNavigation
    const navigation = useNavigation();
    ////

    return (
        <TouchableOpacity
            onPress={() => {
                if (all_product_listPage) {
                    navigation.navigate('DonatedProductDetail', {item: item});
                } else {
                    navigation.navigate('ShopDetail', {
                        id: item?.id,
                        selectedCategory: 'donatedProducts',
                    });
                }
            }}
            key={item.id}
            activeOpacity={0.8}
            style={[styles.mainContainer]}>
            <View style={styles.shopContainer}>
                <View>
                    <Text numberOfLines={1} style={styles.shopName}>
                        {item?.name ? item?.name : item?.product_name}
                    </Text>
                </View>
            </View>
            {staticitems ? (
                <Image
                    source={{
                        uri: item?.image,
                    }}
                    style={styles.imageFood}
                />
            ) : (
                <Image
                    source={{
                        uri: item?.image,
                    }}
                    style={styles.imageFood}
                />
            )}
            <View
                style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: SIZE(16),
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <View style={styles.avatarImageContainer}>
                        {item?.provider_details?.image ? (
                            <Image
                                style={{width: '100%', height: '100%'}}
                                source={{
                                    uri: item?.provider_details?.image,
                                }}
                            />
                        ) : (
                            <Avatar width={'100%'} height={'100%'} />
                        )}
                    </View>
                    <View style={{marginRight: SIZE(3)}}>
                        <Text style={styles.avatarName}>
                            {item?.provider_details?.name?.length > 7
                                ? item?.provider_details?.name?.substring(
                                      0,
                                      7,
                                  ) + '..'
                                : item?.provider_details?.name}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: SIZE(16),
        paddingHorizontal: SIZE(12),
        backgroundColor: '#fff',
        borderRadius: SIZE(12),
        width: '46%',
        margin: SIZE(8),
    },
    shopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    shopName: {
        color: '#00171F',
        fontFamily: FONTS.bold,
    },
    imageContainer: {
        width: SIZE(166),
        height: SIZE(171),
        borderRadius: SIZE(20),
        borderWidth: SIZE(1),
    },
    imageFood: {
        width: SIZE(166),
        height: SIZE(160),
        borderRadius: SIZE(12),
        marginTop: SIZE(16),
    },
    avatarImageContainer: {
        borderRadius: SIZE(32),
        width: SIZE(32),
        height: SIZE(32),
        overflow: 'hidden',
    },
    avatarImage: {
        width: SIZE(32),
        height: SIZE(32),
        borderRadius: SIZE(32),
    },
    avatarName: {
        fontSize: SIZE(14),
        color: '#969696',
        fontFamily: FONTS.regular,
        marginLeft: SIZE(8),
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(8),
        paddingVertical: SIZE(5),
        borderRadius: SIZE(4),
        backgroundColor: '#EDEDED',
        // borderWidth: SIZE(1),
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
